"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[16],{7081:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>l,metadata:()=>i,toc:()=>d});var a=t(3117),r=(t(7294),t(3905)),s=t(7689);const l={title:"Datatypes",sidebar_position:9},o=void 0,i={unversionedId:"logic and theories/Datatypes",id:"logic and theories/Datatypes",title:"Datatypes",description:"Algebraic datatypes, known from programming languages such as ML, offer a convenient way for specifying common data structures. Records and tuples are special cases of algebraic datatypes, and so are scalars (enumeration types). But algebraic datatypes are more general. They can be used to specify finite lists, trees and other recursive structures.",source:"@site/docs/01 - logic and theories/09 - Datatypes.md",sourceDirName:"01 - logic and theories",slug:"/logic and theories/Datatypes",permalink:"/z3guide/docs/logic and theories/Datatypes",draft:!1,editUrl:"https://github.com/microsoft/z3guide/tree/main/website/docs/01 - logic and theories/09 - Datatypes.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{title:"Datatypes",sidebar_position:9},sidebar:"tutorialSidebar",previous:{title:"Arrays",permalink:"/z3guide/docs/logic and theories/Arrays"},next:{title:"Strings",permalink:"/z3guide/docs/logic and theories/Strings"}},c={},d=[{value:"Records",id:"records",level:3},{value:"Scalars (enumeration types)",id:"scalars-enumeration-types",level:3},{value:"Recursive datatypes",id:"recursive-datatypes",level:3},{value:"Mutually recursive datatypes",id:"mutually-recursive-datatypes",level:3},{value:"Z3 will not prove inductive facts",id:"z3-will-not-prove-inductive-facts",level:3},{value:"Nested datatypes with Arrays and Sequences",id:"nested-datatypes-with-arrays-and-sequences",level:3}],u={toc:d};function p(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Algebraic datatypes, known from programming languages such as ML, offer a convenient way for specifying common data structures. Records and tuples are special cases of algebraic datatypes, and so are scalars (enumeration types). But algebraic datatypes are more general. They can be used to specify finite lists, trees and other recursive structures."),(0,r.kt)("h3",{id:"records"},"Records"),(0,r.kt)("p",null,"A record is specified as a datatype with a single constructor and as many arguments as record elements. The number of arguments to a record are always the same. The type system does not allow to extend records and there is no record subtyping."),(0,r.kt)("p",null,"The following example illustrates that two records are equal only if all the arguments are equal. It introduces the parametric type Pair, with constructor mk-pair and two arguments that can be accessed using the selector functions first and second."),(0,r.kt)(s.Z,{input:{code:"(declare-datatypes (T1 T2) ((Pair (mk-pair (first T1) (second T2)))))\n(declare-const p1 (Pair Int Int))\n(declare-const p2 (Pair Int Int))\n(assert (= p1 p2))\n(assert (< (second p1) 20))\n(check-sat)\n(get-model)\n(assert (not (= (first p1) (first p2))))\n(check-sat)",result:{output:"sat\n(\n  (define-fun p2 () (Pair Int Int)\n    (mk-pair 0 19))\n  (define-fun p1 () (Pair Int Int)\n    (mk-pair 0 19))\n)\nunsat\n",error:"",status:"z3-ran",hash:"bbc20750edb35e588ef85f7d9c800896a6ee1360"}},mdxType:"Z3CodeBlock"}),(0,r.kt)("h3",{id:"scalars-enumeration-types"},"Scalars (enumeration types)"),(0,r.kt)("p",null,"A scalar sort is a finite domain sort. The elements of the finite domain are enumerated as distinct constants. For example, the sort S is a scalar type with three values A, B and C. It is possible for three constants of sort S to be distinct, but not for four constants."),(0,r.kt)(s.Z,{input:{code:"(declare-datatypes () ((S A B C)))\n(declare-const x S)\n(declare-const y S)\n(declare-const z S)\n(declare-const u S)\n(assert (distinct x y z))\n(check-sat)\n(assert (distinct x y z u))\n(check-sat)",result:{output:"sat\nunsat\n",error:"",status:"z3-ran",hash:"3ef35a2452ed594647584a0d79d0faf0631f59d3"}},mdxType:"Z3CodeBlock"}),(0,r.kt)("h3",{id:"recursive-datatypes"},"Recursive datatypes"),(0,r.kt)("p",null,"A recursive datatype declaration includes itself directly (or indirectly) as a component. A standard example of a recursive data-type is the one of lists. A parametric list can be specified in Z3 as"),(0,r.kt)(s.Z,{input:{code:"(declare-datatypes (T) ((Lst nil (cons (hd T) (tl Lst)))))\n(declare-const l1 (Lst Int))\n(declare-const l2 (Lst Bool))",result:{output:"",error:"",status:"z3-ran",hash:"e211095fd4f0a49e62b08ffeae3d8f59d0ba8128"}},mdxType:"Z3CodeBlock"}),(0,r.kt)("p",null,"The List recursive datatype is builtin in Z3. The empty list is nil, and the constructor insert is used to build new lists. The accessors head and tail are defined as usual."),(0,r.kt)(s.Z,{input:{code:"(declare-const l1 (List Int))\n(declare-const l2 (List Int))\n(declare-const l3 (List Int))\n(declare-const x Int)\n(assert (not (= l1 nil)))\n(assert (not (= l2 nil)))\n(assert (= (head l1) (head l2)))\n(assert (not (= l1 l2)))\n(assert (= l3 (insert x l2)))\n(assert (< x 100))\n(check-sat)\n(get-model)\n(assert (= (tail l1) (tail l2)))\n(check-sat)",result:{output:'(error "line 1 column 20: unknown sort \'List\'")\n(error "line 2 column 19: unknown sort \'List\'")\n(error "line 3 column 19: unknown sort \'List\'")\n(error "line 5 column 16: unknown constant l1")\n(error "line 6 column 16: unknown constant l2")\n(error "line 7 column 17: unknown constant l1")\n(error "line 8 column 16: unknown constant l1")\n(error "line 9 column 11: unknown constant l3")\nsat\n(\n  (define-fun x () Int\n    99)\n)\n(error "line 13 column 17: unknown constant l1")\nsat\n',error:'(error "line 1 column 20: unknown sort \'List\'")\n(error "line 2 column 19: unknown sort \'List\'")\n(error "line 3 column 19: unknown sort \'List\'")\n(error "line 5 column 16: unknown constant l1")\n(error "line 6 column 16: unknown constant l2")\n(error "line 7 column 17: unknown constant l1")\n(error "line 8 column 16: unknown constant l1")\n(error "line 9 column 11: unknown constant l3")\nsat\n(\n  (define-fun x () Int\n    99)\n)\n(error "line 13 column 17: unknown constant l1")\nsat\n',status:"z3-runtime-error",hash:"ce8bbec151640f145992581f6af5970c2d316cf5"}},mdxType:"Z3CodeBlock"}),(0,r.kt)("p",null,"In the example above, we also assert that l1 and l2 are not nil. This is because the interpretation of head and tail is underspecified on nil. So then head and tail would not be able to distinguish nil from (insert (head nil) (tail nil))."),(0,r.kt)("h3",{id:"mutually-recursive-datatypes"},"Mutually recursive datatypes"),(0,r.kt)("p",null,"You can also specify mutually recursive datatypes for Z3. We list one example below."),(0,r.kt)(s.Z,{input:{code:"; declare a mutually recursive parametric datatype\n(declare-datatypes (T) ((Tree leaf (node (value T) (children TreeList)))\n                        (TreeList nil (cons (car Tree) (cdr TreeList)))))\n(declare-const t1 (Tree Int))\n(declare-const t2 (Tree Bool))\n; we must use the 'as' construct to distinguish the leaf (Tree Int) from leaf (Tree Bool)\n(assert (not (= t1 (as leaf (Tree Int)))))\n(assert (< (value t1) 20))\n(assert (not (is-leaf t2)))\n(assert (not (value t2)))\n(check-sat)\n(get-model)",result:{output:"sat\n(\n  (define-fun t1 () (Tree Int)\n    (node 0 (as nil (TreeList Int))))\n  (define-fun t2 () (Tree Bool)\n    (node false (as nil (TreeList Bool))))\n)\n",error:"",status:"z3-ran",hash:"8cee58b365a940862355175da5dc2360f6851767"}},mdxType:"Z3CodeBlock"}),(0,r.kt)("p",null,"In the example above, we have a tree of Booleans and a tree of integers. The leaf constant must return a tree of a specific sort. To specify the result sort, we use the qualified identifier (as leaf (Tree Int)). Note that, we do not need to use a qualified identifer for value, since Z3 can infer the intended declaration using the sort of the argument."),(0,r.kt)("h3",{id:"z3-will-not-prove-inductive-facts"},"Z3 will not prove inductive facts"),(0,r.kt)("p",null,"The ground decision procedures for recursive datatypes don't lift to establishing inductive facts. Z3 does not contain methods for producing proofs by induction. This may change in the future. In particular, consider the following example where the function p is true on all natural numbers, which can be proved by induction over Nat. Z3 enters a matching loop as it attempts instantiating the universally quantified implication."),(0,r.kt)(s.Z,{input:{code:"(set-option :timeout 2000)\n(declare-datatypes () ((Nat zero (succ (pred Nat)))))\n(declare-fun p (Nat) Bool)\n(assert (p zero))\n(assert (forall ((x Nat)) (implies (p (pred x)) (p x))))\n(assert (not (forall ((x Nat)) (p x))))\n(check-sat)\n(get-info :all-statistics)",result:{output:"unknown\n(:added-eqs               6441\n :binary-propagations     1\n :conflicts               920\n :datatype-accessor-ax    921\n :datatype-constructor-ax 1840\n :datatype-occurs-check   1842\n :datatype-splits         921\n :decisions               920\n :final-checks            921\n :max-generation          1\n :max-memory              12.64\n :memory                  10.31\n :mk-bool-var             2765\n :num-allocs              72236\n :num-checks              1\n :propagations            1\n :quant-instantiations    920\n :rlimit-count            65789\n :time                    2.63)\n",error:"",status:"z3-ran",hash:"ae6654f43b2bb507d8b14252c29bbbab64a8e5b9"}},mdxType:"Z3CodeBlock"}),(0,r.kt)("h3",{id:"nested-datatypes-with-arrays-and-sequences"},"Nested datatypes with Arrays and Sequences"),(0,r.kt)("p",null,"In some applications it is convenient to have a sequence of types that are\nrecursively defined. For example an abstract syntax tree of a program is a sequence of\nbasic statements, and a basic statement can be an assignment or an if-then-else statement,\nwhere the then and else branches are statements. Similarly, it may be convenient to use\na nesting of algebraic data-types and arrays. Z3 supports nesting ADTs over sequences and over\nranges of arrays."),(0,r.kt)(s.Z,{input:{code:"(declare-sort Expr)\n(declare-sort Var)\n(declare-datatypes ((Stmt 0)) \n  (((Assignment (lval Var) (rval Expr)) \n    (If (cond Expr) (th Stmt) (el Stmt)) \n    (Seq (stmts (Seq Stmt))))))\n\n(declare-const s Stmt)\n(declare-const t Stmt)\n\n(assert ((_ is Seq) t))\n(assert ((_ is Seq) s))\n(assert (= s (seq.nth (stmts t) 2)))\n(assert (>= (seq.len (stmts s)) 5))\n(check-sat)\n(get-model)\n(assert (= s (Seq (seq.unit s))))\n(check-sat)",result:{output:"sat\n(\n  ;; universe for Expr:\n  ;;   Expr!val!7 Expr!val!3 Expr!val!1 Expr!val!4 Expr!val!0 Expr!val!6 Expr!val!5 Expr!val!2 \n  ;; -----------\n  ;; definitions for universe elements:\n  (declare-fun Expr!val!7 () Expr)\n  (declare-fun Expr!val!3 () Expr)\n  (declare-fun Expr!val!1 () Expr)\n  (declare-fun Expr!val!4 () Expr)\n  (declare-fun Expr!val!0 () Expr)\n  (declare-fun Expr!val!6 () Expr)\n  (declare-fun Expr!val!5 () Expr)\n  (declare-fun Expr!val!2 () Expr)\n  ;; cardinality constraint:\n  (forall ((x Expr))\n          (or (= x Expr!val!7)\n              (= x Expr!val!3)\n              (= x Expr!val!1)\n              (= x Expr!val!4)\n              (= x Expr!val!0)\n              (= x Expr!val!6)\n              (= x Expr!val!5)\n              (= x Expr!val!2)))\n  ;; -----------\n  ;; universe for Var:\n  ;;   Var!val!2 Var!val!0 Var!val!3 Var!val!4 Var!val!5 Var!val!6 Var!val!7 Var!val!1 \n  ;; -----------\n  ;; definitions for universe elements:\n  (declare-fun Var!val!2 () Var)\n  (declare-fun Var!val!0 () Var)\n  (declare-fun Var!val!3 () Var)\n  (declare-fun Var!val!4 () Var)\n  (declare-fun Var!val!5 () Var)\n  (declare-fun Var!val!6 () Var)\n  (declare-fun Var!val!7 () Var)\n  (declare-fun Var!val!1 () Var)\n  ;; cardinality constraint:\n  (forall ((x Var))\n          (or (= x Var!val!2)\n              (= x Var!val!0)\n              (= x Var!val!3)\n              (= x Var!val!4)\n              (= x Var!val!5)\n              (= x Var!val!6)\n              (= x Var!val!7)\n              (= x Var!val!1)))\n  ;; -----------\n  (define-fun t () Stmt\n    (Seq (as seq.empty (Seq Stmt))))\n  (define-fun s () Stmt\n    (Seq (seq.++ (seq.unit (Assignment Var!val!6 Expr!val!6))\n             (seq.unit (Assignment Var!val!1 Expr!val!1))\n             (seq.unit (Assignment Var!val!0 Expr!val!0))\n             (seq.unit (Assignment Var!val!5 Expr!val!5))\n             (seq.unit (Assignment Var!val!2 Expr!val!2)))))\n  (define-fun seq.nth_u ((x!0 (Seq Stmt)) (x!1 Int)) Stmt\n    (Seq (seq.++ (seq.unit (Assignment Var!val!6 Expr!val!6))\n                 (seq.unit (Assignment Var!val!1 Expr!val!1))\n                 (seq.unit (Assignment Var!val!0 Expr!val!0))\n                 (seq.unit (Assignment Var!val!5 Expr!val!5))\n                 (seq.unit (Assignment Var!val!2 Expr!val!2)))))\n)\nunsat\n",error:"",status:"z3-ran",hash:"d1536a31776dcc1c6b862e9d33a284c5fe0c38a5"}},mdxType:"Z3CodeBlock"}))}p.isMDXComponent=!0}}]);