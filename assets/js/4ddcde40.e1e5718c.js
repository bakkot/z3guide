"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[296],{7284:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var o=n(3117),a=(n(7294),n(3905)),s=n(7689);const i={title:"Basic Commands",sidebar_position:2},r=void 0,l={unversionedId:"logic and theories/basiccommands",id:"logic and theories/basiccommands",title:"Basic Commands",description:"The Z3 input format is an extension of the one defined by the SMT-LIB 2.0 standard. A Z3 script is a sequence of commands. The help command displays a list of all available commands. The command echo displays a message. Internally, Z3 maintains a stack of user provided formulas and declarations. We say these are the assertions provided by the user. The command declare-const declares a constant of a given type (aka sort). The command declare-fun declares a function. In the following example, we declared a function that receives an integer and a boolean, and returns an integer.",source:"@site/docs/01 - logic and theories/02 - basiccommands.md",sourceDirName:"01 - logic and theories",slug:"/logic and theories/basiccommands",permalink:"/z3guide/docs/logic and theories/basiccommands",draft:!1,editUrl:"https://github.com/microsoft/z3guide/tree/main/website/docs/01 - logic and theories/02 - basiccommands.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Basic Commands",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Introduction to SMTLIB Logic and Theories",permalink:"/z3guide/docs/logic and theories/intro"},next:{title:"Propositional Logic",permalink:"/z3guide/docs/logic and theories/propositional-logic"}},d={},c=[{value:"Using Scopes",id:"using-scopes",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Additional commands",id:"additional-commands",level:3}],u={toc:c};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The Z3 input format is an extension of the one defined by the ",(0,a.kt)("a",{parentName:"p",href:"httpwww.smtlib.org"},"SMT-LIB 2.0 standard"),". A Z3 script is a sequence of commands. The help command displays a list of all available commands. The command echo displays a message. Internally, Z3 maintains a stack of user provided formulas and declarations. We say these are the assertions provided by the user. The command declare-const declares a constant of a given type (aka sort). The command declare-fun declares a function. In the following example, we declared a function that receives an integer and a boolean, and returns an integer."),(0,a.kt)(s.Z,{input:{code:'(echo "starting Z3...")\n(declare-const a Int)\n(declare-fun f (Int Bool) Int)',result:{output:"starting Z3...\n",error:"",status:"z3-ran",hash:"72f03b3c523df691764b506cf6a6b805a3f03cbc"}},mdxType:"Z3CodeBlock"}),(0,a.kt)("p",null,"The command assert adds a formula into the Z3 internal stack. We say the set of formulas in the Z3 stack is satisfiable if there is an interpretation (for the user declared constants and functions) that makes all asserted formulas true."),(0,a.kt)(s.Z,{input:{code:"(declare-const a Int)\n(declare-fun f (Int Bool) Int)\n(assert (< a 10))\n(assert (< (f a true) 100))\n(check-sat)",result:{output:"sat\n",error:"",status:"z3-ran",hash:"24f3fe2a4dbca04625855a2b49df674bc6100426"}},mdxType:"Z3CodeBlock"}),(0,a.kt)("p",null,"The first asserted formula states that the constant a must be greater than 10. The second one states that the function f applied to a and true must return a value less than 100. The command check-sat determines whether the current formulas on the Z3 stack are satisfiable or not. If the formulas are satisfiable, Z3 returns sat. If they are not satisfiable (i.e., they are unsatisfiable), Z3 returns unsat. Z3 may also return unknown when it can't determine whether a formula is satisfiable or not."),(0,a.kt)("p",null,"When the command check-sat returns sat, the command get-model can be used to retrieve an interpretation that makes all formulas on the Z3 internal stack true."),(0,a.kt)(s.Z,{input:{code:"(declare-const a Int)\n(declare-fun f (Int Bool) Int)\n(assert (< a 10))\n(assert (< (f a true) 100))\n(check-sat)\n(get-model)",result:{output:"sat\n(\n  (define-fun a () Int\n    0)\n  (define-fun f ((x!0 Int) (x!1 Bool)) Int\n    0)\n)\n",error:"",status:"z3-ran",hash:"7066585f69a4f59e51928c78b55b88ed5a15fb6b"}},mdxType:"Z3CodeBlock"}),(0,a.kt)("p",null,"The interpretation is provided using definitions. For example, the definition"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"}," define-fun a () Int ","[val]",")")),(0,a.kt)("p",null,"states that the value of a in the model is ","[val]",". The definition"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"(define-fun f ((x!1 Int) (x!2 Bool)) Int\n...\n)")),(0,a.kt)("p",null,"is very similar to a function definition used in programming languages. In this example, x1 and x2 are the arguments of the function interpretation created by Z3. For this simple example, the definition of f is based on ite's (aka if-then-elses or conditional expressions). For example, the expression"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"(ite (and (= x!1 11) (= x!2 false)) 21 0)")),(0,a.kt)("p",null,"evaluates (returns) 21 when x!1 is equal to 11, and x!2 is equal to false. Otherwise, it returns 0."),(0,a.kt)("h2",{id:"using-scopes"},"Using Scopes"),(0,a.kt)("p",null,"In some applications, we want to explore several similar problems that share several definitions and assertions. We can use the commands push and pop for doing that. Z3 maintains a global stack of declarations and assertions. The command push creates a new scope by saving the current stack size. The command pop removes any assertion or declaration performed between it and the matching push. The check-sat and get-assertions commands always operate on the content of the global stack."),(0,a.kt)("p",null,"In the following example, the command (assert p) signs an error because the pop command removed the declaration for p. If the last pop command is removed, then the error is corrected."),(0,a.kt)(s.Z,{input:{code:"(declare-const x Int)\n(declare-const y Int)\n(declare-const z Int)\n(push)\n(assert (= (+ x y) 10))\n(assert (= (+ x (* 2 y)) 20))\n(check-sat)\n(pop) ; remove the two assertions\n(push) \n(assert (= (+ (* 3 x) y) 10))\n(assert (= (+ (* 2 x) (* 2 y)) 21))\n(check-sat)\n(declare-const p Bool)\n(pop)\n(assert p) ; error, since declaration of p was removed from the stack",result:{output:'sat\nunsat\n(error "line 15 column 8: unknown constant p")\n',error:'sat\nunsat\n(error "line 15 column 8: unknown constant p")\n',status:"z3-runtime-error",hash:"c732e84331cfb6e135c7f9ab5af430855af05f60"}},mdxType:"Z3CodeBlock"}),(0,a.kt)("p",null,"The push and pop commands can optionally receive a numeral argument as specifed by the SMT 2 language."),(0,a.kt)("h2",{id:"configuration"},"Configuration"),(0,a.kt)("p",null,"The command set-option is used to configure Z3. Z3 has several options to control its behavior. Some of these options (e.g., produce-proofs) can only be set before any declaration or assertion. We use the reset command to erase all assertions and declarations. After the reset command, all configuration options can be set."),(0,a.kt)(s.Z,{input:{code:'(set-option :print-success true)\n(set-option :produce-unsat-cores true) ; enable generation of unsat cores\n(set-option :produce-models true) ; enable model generation\n(set-option :produce-proofs true) ; enable proof generation\n(declare-const x Int)\n(assert (= x 1))\n(set-option :produce-proofs false) ; error, cannot change this option after an assertion\n(echo "before reset")\n(reset)\n(set-option :produce-proofs false) ; ok',result:{output:"success\n(error \"line 2 column 33: error setting ':produce-unsat-cores', option value cannot be modified after initialization\")\nsuccess\n(error \"line 4 column 29: error setting ':produce-proofs', option value cannot be modified after initialization\")\nsuccess\nsuccess\n(error \"line 7 column 28: error setting ':produce-proofs', option value cannot be modified after initialization\")\nbefore reset\nsuccess\n(error \"line 10 column 28: error setting ':produce-proofs', option value cannot be modified after initialization\")\n",error:"success\n(error \"line 2 column 33: error setting ':produce-unsat-cores', option value cannot be modified after initialization\")\nsuccess\n(error \"line 4 column 29: error setting ':produce-proofs', option value cannot be modified after initialization\")\nsuccess\nsuccess\n(error \"line 7 column 28: error setting ':produce-proofs', option value cannot be modified after initialization\")\nbefore reset\nsuccess\n(error \"line 10 column 28: error setting ':produce-proofs', option value cannot be modified after initialization\")\n",status:"z3-runtime-error",hash:"75520c3a7f3881546db0a75d735e6e3849e135f3"}},mdxType:"Z3CodeBlock"}),(0,a.kt)("p",null,"The option print-success true is particularly useful when Z3 is being controlled by another application using pipes. In this mode, commands, that otherwise would not print any output, will print success."),(0,a.kt)("h3",{id:"additional-commands"},"Additional commands"),(0,a.kt)("p",null,"The command (display t) just applies the Z3 pretty printer to the given expression. The command (simplify t) displays a possibly simpler expression equivalent to t. This command accepts many different options, (help simplify) will display all available options."),(0,a.kt)(s.Z,{input:{code:"(declare-const a (Array Int Int))\n(declare-const x Int)\n(declare-const y Int)\n(display (+ x 2 x 1))\n(simplify (+ x 2 x 1))\n(simplify (< (+ x y) (+ x y)))\n(simplify (< (+ x y) (+ x y)) :som true) ; put all expressions in sum-of-monomials form.\n(simplify (= x (+ y 2)) :arith-lhs true)\n(simplify (= (store (store a 1 2) 4 3)\n             (store (store a 4 3) 1 2)))\n(simplify (= (store (store a 1 2) 4 3)\n             (store (store a 4 3) 1 2))\n          :sort-store true)\n(help simplify)",result:{output:"(+ x 2 x 1)\n(+ 3 (* 2 x))\nfalse\nfalse\n(= (+ x (* (- 1) y)) 2)\n(= (store (store a 1 2) 4 3) (store (store a 4 3) 1 2))\ntrue\n\" (simplify <term> (<keyword> <value>)*)\n    simplify the given term using builtin theory simplification rules.\n    The following options are available:\n      algebraic_number_evaluator (bool) simplify/evaluate expressions containing (algebraic) irrational numbers. (default: true)\n      arith_ineq_lhs (bool) rewrite inequalities so that right-hand-side is a constant. (default: false)\n      arith_lhs (bool) all monomials are moved to the left-hand-side, and the right-hand-side is just a constant. (default: false)\n      bit2bool (bool) try to convert bit-vector terms of size 1 into Boolean terms (default: true)\n      blast_distinct (bool) expand a distinct predicate into a quadratic number of disequalities (default: false)\n      blast_distinct_threshold (unsigned int) when blast_distinct is true, only distinct expressions with less than this number of arguments are blasted (default: 4294967295)\n      blast_eq_value (bool) blast (some) Bit-vector equalities into bits (default: false)\n      blast_select_store (bool) eagerly replace all (select (store ..) ..) term by an if-then-else term (default: false)\n      bv_extract_prop (bool) attempt to partially propagate extraction inwards (default: false)\n      bv_ineq_consistency_test_max (unsigned int) max size of conjunctions on which to perform consistency test based on inequalities on bitvectors. (default: 0)\n      bv_ite2id (bool) rewrite ite that can be simplified to identity (default: false)\n      bv_le2extract (bool) disassemble bvule to extract (default: true)\n      bv_le_extra (bool) additional bu_(u/s)le simplifications (default: false)\n      bv_not_simpl (bool) apply simplifications for bvnot (default: false)\n      bv_sort_ac (bool) sort the arguments of all AC operators (default: false)\n      cache_all (bool) cache all intermediate results. (default: false)\n      elim_and (bool) conjunctions are rewritten using negation and disjunctions (default: false)\n      elim_ite (bool) eliminate ite in favor of and/or (default: true)\n      elim_rem (bool) replace (rem x y) with (ite (>= y 0) (mod x y) (- (mod x y))). (default: false)\n      elim_sign_ext (bool) expand sign-ext operator using concat and extract (default: true)\n      elim_to_real (bool) eliminate to_real from arithmetic predicates that contain only integers. (default: false)\n      eq2ineq (bool) expand equalities into two inequalities (default: false)\n      expand_nested_stores (bool) replace nested stores by a lambda expression (default: false)\n      expand_power (bool) expand (^ t k) into (* t ... t) if  1 < k <= max_degree. (default: false)\n      expand_select_ite (bool) expand select over ite expressions (default: false)\n      expand_select_store (bool) conservatively replace a (select (store ...) ...) term by an if-then-else term (default: false)\n      expand_store_eq (bool) reduce (store ...) = (store ...) with a common base into selects (default: false)\n      expand_tan (bool) replace (tan x) with (/ (sin x) (cos x)). (default: false)\n      flat (bool) create nary applications for and,or,+,*,bvadd,bvmul,bvand,bvor,bvxor (default: true)\n      gcd_rounding (bool) use gcd rounding on integer arithmetic atoms. (default: false)\n      hi_div0 (bool) use the 'hardware interpretation' for division by zero (for bit-vector terms) (default: true)\n      hoist_ite (bool) hoist shared summands under ite expressions (default: false)\n      hoist_mul (bool) hoist multiplication over summation to minimize number of multiplications (default: false)\n      ignore_patterns_on_ground_qbody (bool) ignores patterns on quantifiers that don't mention their bound variables. (default: true)\n      ite_extra_rules (bool) extra ite simplifications, these additional simplifications may reduce size locally but increase globally (default: false)\n      local_ctx (bool) perform local (i.e., cheap) context simplifications (default: false)\n      local_ctx_limit (unsigned int) limit for applying local context simplifier (default: 4294967295)\n      max_degree (unsigned int) max degree of algebraic numbers (and power operators) processed by simplifier. (default: 64)\n      max_memory (unsigned int) maximum amount of memory in megabytes (default: 4294967295)\n      max_steps (unsigned int) maximum number of steps (default: 4294967295)\n      mul2concat (bool) replace multiplication by a power of two into a concatenation (default: false)\n      mul_to_power (bool) collpase (* t ... t) into (^ t k), it is ignored if expand_power is true. (default: false)\n      print (bool) (default: true)  print the simplified term.\n      print_proofs (bool) (default: false) print a proof showing the original term is equal to the resultant one.\n      print_statistics (bool) (default: false) print statistics.\n      pull_cheap_ite (bool) pull if-then-else terms when cheap. (default: false)\n      push_ite_arith (bool) push if-then-else over arithmetic terms. (default: false)\n      push_ite_bv (bool) push if-then-else over bit-vector terms. (default: false)\n      push_to_real (bool) distribute to_real over * and +. (default: true)\n      rewrite_patterns (bool) rewrite patterns. (default: false)\n      som (bool) put polynomials in sum-of-monomials form (default: false)\n      som_blowup (unsigned int) maximum increase of monomials generated when putting a polynomial in sum-of-monomials normal form (default: 10)\n      sort_store (bool) sort nested stores when the indices are known to be different (default: false)\n      sort_sums (bool) sort the arguments of + application. (default: false)\n      split_concat_eq (bool) split equalities of the form (= (concat t1 t2) t3) (default: false)\n      timeout (unsigned int) (default: infty) timeout in milliseconds. (default: 4294967295)\n\"\n",error:"",status:"z3-ran",hash:"312f032596600b88a7b1f400abba16547595ce18"}},mdxType:"Z3CodeBlock"}),(0,a.kt)("p",null,"The define-sort command defines a new sort symbol that is an abbreviation for a sort expression. The new sort symbol can be parameterized, in which case the names of the parameters are specified in the command and the sort expression uses the sort parameters. The form of the command is this"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"(define-sort ","[symbol]"," (","[symbol]","+) ","[sort]",")")),(0,a.kt)("p",null,"The following example defines several abbreviations for sort expressions."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-z2",metastring:"no-build","no-build":!0},"(define-sort IList () (List Int))\n(define-sort List-Set (T) (Array (List T) Bool))\n(define-sort I () Int)\n\n(declare-const s1 (Set I))\n(declare-const s2 (List-Set Int))\n(declare-const a I)\n(declare-const l IList)\n\n(assert (= (select s1 a) true))\n(assert (= (select s2 l) false))\n(check-sat)\n(get-model)\n")))}m.isMDXComponent=!0}}]);