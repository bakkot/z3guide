---
title: Cores and Satisfying Subsets
sidebar_position: 5
---


# Enumeration of Minimal Unsatisfiable Cores and Maximal Satisfying Subsets

This tutorial illustrates how to use Z3 for extracting all minimal unsatisfiable cores
together with all maximal satisfying subsets. 

## Origin
The algorithm that we describe next 
represents the essence of the core extraction procedure by Liffiton and Malik and independently 
by Previti and Marques-Silva:




[Enumerating Infeasibility: Finding Multiple MUSes Quickly](http://www.iwu.edu/~mliffito/publications/cpaior13_liffiton_MARCO.pdf)
Mark H. Liffiton and Ammar Malik
in _Proc. 10<sup>th</sup> International Conference on Integration of Artificial 
Intelligence (AI) and Operations Research (OR) techniques in Constraint Programming_ (CPAIOR-2013), 160-175, May 2013.


[Partial MUS Enumeration](http://logos.ucd.ie/wiki/doku.php?id=emus)
Alessandro Previti, Joao Marques-Silva
in <i>Proc. AAAI-2013</i> July 2013


## Z3py Features
This implementation contains no tuning. 
It was contributed by Mark Liffiton and it is a simplification of one of the versions available from
[his Marco Polo Web site](http://sun.iwu.edu/~mliffito/marco/). 
Code for eMUS is also [[available](http://logos.ucd.ie/wiki/doku.php?id=emus).
The example illustrates the following features of Z3's Python-based API:


* Using assumptions to track unsatisfiable cores.
* Using multiple solvers and passing constraints between them.
* Calling the C-based API from Python. Not all API functions are supported over the Python 
wrappers. This example shows how to get a unique integer identifier of an AST, 
which can be used as a key in a hash-table.

## Idea of the Algorithm
The main idea of the algorithm is to maintain two 
logical contexts and exchange information between them:


* The <em>MapSolver</em> is used to enumerate sets of clauses that are not already
supersets of an existing unsatisfiable core and not already a subset of a maximal satisfying assignment.
The <em>MapSolver</em> uses one unique atomic predicate per <em>soft</em> clause, so it enumerates
sets of atomic predicates. For each minimal unsatisfiable core, say, represented by predicates
<em>p<sub>1</sub>, p<sub>2</sub>, p<sub>5</sub></em>, the <em>MapSolver</em> contains the 
clause <em> &not; p<sub>1</sub> &or; &not; p<sub>2</sub> &or; &not; p<sub>5</sub></em>.
For each maximal satisfiable subset, say, represented by predicats
<em>p<sub>2</sub>, p<sub>3</sub>, p<sub>5</sub></em>, the 
<em>MapSolver</em> contains a clause corresponding to the disjunction of all literals
not in the maximal satisfiable subset, <em>p<sub>1</sub> &or; p<sub>4</sub> &or; p<sub>6</sub></em>. 

* The <em>SubsetSolver</em> contains a set
of soft clauses (clauses with the unique indicator atom occurring negated).
The <em>MapSolver</em> feeds it a set of clauses (the indicator atoms).
Recall that these are not already a superset of an existing minimal
unsatisfiable core, or a subset of a maximal satisfying assignment. 
If asserting these atoms makes the <em>SubsetSolver</em> context infeasible, 
then it finds a minimal unsatisfiable subset corresponding to these atoms.
If asserting the atoms is consistent with the <em>SubsetSolver</em>, then 
it extends this set of atoms maximally to a satisfying set.

```python


def main():
    x, y = Reals('x y')
    constraints = [x > 2, x < 1, x < 0, Or(x + y > 0, y < 0), Or(y >= 0, x >= 0), Or(y < 0, x < 0), Or(y > 0, x < 0)]
    csolver = SubsetSolver(constraints)
    msolver = MapSolver(n=csolver.n)
    for orig, lits in enumerate_sets(csolver, msolver):
        output = "%s %s" % (orig, lits)
        print(output)


def get_id(x):
    return Z3_get_ast_id(x.ctx.ref(),x.as_ast())


def MkOr(clause):
    if clause == []:
       return False
    else:
       return Or(clause)

class SubsetSolver:
   constraints = []
   n = 0
   s = Solver()
   varcache = {}
   idcache = {}

   def __init__(self, constraints):
       self.constraints = constraints
       self.n = len(constraints)
       for i in range(self.n):
           self.s.add(Implies(self.c_var(i), constraints[i]))

   def c_var(self, i):
       if i not in self.varcache:
          v = Bool(str(self.constraints[abs(i)]))
          self.idcache[get_id(v)] = abs(i)
          if i >= 0:
             self.varcache[i] = v
          else:
             self.varcache[i] = Not(v)
       return self.varcache[i]

   def check_subset(self, seed):
       assumptions = self.to_c_lits(seed)
       return (self.s.check(assumptions) == sat)
        
   def to_c_lits(self, seed):
       return [self.c_var(i) for i in seed]

   def complement(self, aset):
       return set(range(self.n)).difference(aset)

   def seed_from_core(self):
       core = self.s.unsat_core()
       return [self.idcache[get_id(x)] for x in core]

   def shrink(self, seed):       
       current = set(seed)
       for i in seed:
          if i not in current:
             continue
          current.remove(i)
          if not self.check_subset(current):
             current = set(self.seed_from_core())
          else:
             current.add(i)
       return current

   def grow(self, seed):
       current = seed
       for i in self.complement(current):
           current.append(i)
           if not self.check_subset(current):
              current.pop()
       return current



class MapSolver:
   def __init__(self, n):
       """Initialization.
             Args:
            n: The number of constraints to map.
       """
       self.solver = Solver()
       self.n = n
       self.all_n = set(range(n))  # used in complement fairly frequently

   def next_seed(self):
       """Get the seed from the current model, if there is one.
	
            Returns:
            A seed as an array of 0-based constraint indexes.
       """
       if self.solver.check() == unsat:
            return None
       seed = self.all_n.copy()  # default to all True for "high bias"
       model = self.solver.model()
       for x in model:
           if is_false(model[x]):
              seed.remove(int(x.name()))
       return list(seed)

   def complement(self, aset):
       """Return the complement of a given set w.r.t. the set of mapped constraints."""
       return self.all_n.difference(aset)

   def block_down(self, frompoint):
       """Block down from a given set."""
       comp = self.complement(frompoint)
       self.solver.add( MkOr( [Bool(str(i)) for i in comp] ) )

   def block_up(self, frompoint):
       """Block up from a given set."""
       self.solver.add( MkOr( [Not(Bool(str(i))) for i in frompoint] ) )
    


def enumerate_sets(csolver, map):
    """Basic MUS/MCS enumeration, as a simple example."""
    while True:
        seed = map.next_seed()
        if seed is None:
           return
        if csolver.check_subset(seed):
           MSS = csolver.grow(seed)
           yield ("MSS", csolver.to_c_lits(MSS))
           map.block_down(MSS)
        else:
           MUS = csolver.shrink(seed)
           yield ("MUS", csolver.to_c_lits(MUS))
           map.block_up(MUS)

main()

```
