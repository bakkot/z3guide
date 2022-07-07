"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[386],{1296:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>u,frontMatter:()=>s,metadata:()=>l,toc:()=>p});var a=n(3117),i=(n(7294),n(3905)),o=n(7689);const s={title:"Probes",sidebar_position:4},r=void 0,l={unversionedId:"strategies/probes",id:"strategies/probes",title:"Probes",description:"Probes (aka formula measures) are evaluated over goals. Boolean expressions over them can be built using relational operators and Boolean connectives. The tactic (fail-if cond) fails if the given goal does not satisfy the condition cond. Many numeric and Boolean measures are available in Z3. The command (help-tactic) provides the list of all built-in probes.",source:"@site/docs/03 - strategies/04 - probes.md",sourceDirName:"03 - strategies",slug:"/strategies/probes",permalink:"/z3guide/docs/strategies/probes",draft:!1,editUrl:"https://github.com/microsoft/z3guide/tree/main/website/docs/03 - strategies/04 - probes.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Probes",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Tactics",permalink:"/z3guide/docs/strategies/tactics"},next:{title:"Introduction",permalink:"/z3guide/docs/optimization/intro"}},c={},p=[],d={toc:p};function u(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Probes (aka formula measures) are evaluated over goals. Boolean expressions over them can be built using relational operators and Boolean connectives. The tactic ",(0,i.kt)("inlineCode",{parentName:"p"},"(fail-if cond)")," fails if the given goal does not satisfy the condition ",(0,i.kt)("inlineCode",{parentName:"p"},"cond"),". Many numeric and Boolean measures are available in Z3. The command ",(0,i.kt)("inlineCode",{parentName:"p"},"(help-tactic)")," provides the list of all built-in probes."),(0,i.kt)(o.Z,{input:{code:"(help-tactic)",result:{output:'(error "line 1 column 13: parallel tactic is disabled in single threaded mode")\n',error:'(error "line 1 column 13: parallel tactic is disabled in single threaded mode")\n',status:"z3-runtime-error",hash:"2856f0e6a0d1df8445d98754831b708772c4393a"}},mdxType:"Z3CodeBlock"}),(0,i.kt)("p",null,"In the following example, we build a simple tactic using ",(0,i.kt)("inlineCode",{parentName:"p"},"fail-if"),". It also shows that ",(0,i.kt)("inlineCode",{parentName:"p"},"echo")," can be used to display the value returned by a probe. The ",(0,i.kt)("inlineCode",{parentName:"p"},"echo")," tactic is mainly used for debugging purposes."),(0,i.kt)(o.Z,{input:{code:'(declare-const x Real)\n(declare-const y Real)\n(declare-const z Real)\n\n(push)\n(assert (> (+ x y z) 0.0))\n\n(apply (echo "num consts: " num-consts))\n\n(apply (fail-if (> num-consts 2)))\n(pop)\n\n(echo "trying again...")\n(assert (> (+ x y) 0.0))\n(apply (fail-if (> num-consts 2)))',result:{output:'num consts: 3\n(goals\n(goal\n  (> (+ x y z) 0.0)\n  :precision precise :depth 0)\n)\n(error "tactic failed: fail-if tactic")\ntrying again...\n(goals\n(goal\n  (> (+ x y) 0.0)\n  :precision precise :depth 0)\n)\n',error:'num consts: 3\n(goals\n(goal\n  (> (+ x y z) 0.0)\n  :precision precise :depth 0)\n)\n(error "tactic failed: fail-if tactic")\ntrying again...\n(goals\n(goal\n  (> (+ x y) 0.0)\n  :precision precise :depth 0)\n)\n',status:"z3-runtime-error",hash:"4e06c75d7adb4973d14249c092580623ae465c76"}},mdxType:"Z3CodeBlock"}),(0,i.kt)("p",null,"Z3 also provides the combinator (tactical) ",(0,i.kt)("inlineCode",{parentName:"p"},"(if p t1 t2)")," which is a shorthand for:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"(or-else (then (fail-if (not p)) t1) t2)\n")),(0,i.kt)("p",null,"The combinator ",(0,i.kt)("inlineCode",{parentName:"p"},"(when p t)")," is a shorthand for:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"(if p t skip)\n")),(0,i.kt)("p",null,"The tactic skip just returns the input goal. The following example demonstrates how to use the if combinator."),(0,i.kt)(o.Z,{input:{code:"(declare-const x Real)\n(declare-const y Real)\n(declare-const z Real)\n\n(assert (>= (- (^ x 2.0) (^ y 2.0)) 0.0))\n\n(apply (if (> num-consts 2) simplify factor))\n\n(assert (>= (+ x x y z) 0.0))\n\n(apply (if (> num-consts 2) simplify factor))",result:{output:"(goals\n(goal\n  (<= (* (+ y (* (- 1.0) x)) (+ y x)) 0.0)\n  :precision precise :depth 1)\n)\n(goals\n(goal\n  (>= (+ (^ x 2.0) (* (- 1.0) (^ y 2.0))) 0.0)\n  (>= (+ (* 2.0 x) y z) 0.0)\n  :precision precise :depth 1)\n)\n",error:"",status:"z3-ran",hash:"6f315972b865b6460f1cbce36710e029edd2c961"}},mdxType:"Z3CodeBlock"}))}u.isMDXComponent=!0}}]);