"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[406],{4193:(e,r,a)=>{a.r(r),a.d(r,{assets:()=>d,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var t=a(3117),i=(a(7294),a(3905)),n=a(7689);const o={title:"Special Relations",sidebar_position:14},s="Special Binary Relations",l={unversionedId:"logic and theories/Special Relations",id:"logic and theories/Special Relations",title:"Special Relations",description:"Binary relations that are partial orders, linear orders, tree orders, and piecewise linear orders",source:"@site/docs/01 - logic and theories/14 - Special Relations.md",sourceDirName:"01 - logic and theories",slug:"/logic and theories/Special Relations",permalink:"/z3guide/docs/logic and theories/Special Relations",draft:!1,editUrl:"https://github.com/microsoft/z3guide/tree/main/website/docs/01 - logic and theories/14 - Special Relations.md",tags:[],version:"current",sidebarPosition:14,frontMatter:{title:"Special Relations",sidebar_position:14},sidebar:"tutorialSidebar",previous:{title:"Unicode Characters",permalink:"/z3guide/docs/logic and theories/Characters"},next:{title:"Quantifiers",permalink:"/z3guide/docs/logic and theories/Quantifiers"}},d={},c=[{value:"Partial Order",id:"partial-order",level:2},{value:"Linear Order",id:"linear-order",level:2},{value:"Tree Order",id:"tree-order",level:2},{value:"Piecewise Linear Order",id:"piecewise-linear-order",level:2}],u={toc:c};function p(e){let{components:r,...a}=e;return(0,i.kt)("wrapper",(0,t.Z)({},u,a,{components:r,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"special-binary-relations"},"Special Binary Relations"),(0,i.kt)("p",null,"Binary relations that are partial orders, linear orders, tree orders, and piecewise linear orders\ncan be axiomatized using first order quantifiers. However, reasoning with these quantified axioms involves\nnon-linear overhead, up to a quadratic number of quantifier instantiations.\nThe decision procedures for partial, linear, tree and piecewise linear orders in z3\nuse variants of Ford-Fulkerson push relabeling graphs."),(0,i.kt)("h2",{id:"partial-order"},"Partial Order"),(0,i.kt)(n.Z,{input:{code:"(declare-sort A 0)\n(declare-fun R (A A) Bool)\n(assert (forall ((x A)) (R x x)))\n(assert (forall ((x A) (y A)) (=> (and (R x y) (R y x)) (= x y))))\n(assert (forall ((x A) (y A) (z A)) (=> (and (R x y) (R y z)) (R x z))))",result:{output:"",error:"",status:"z3-ran",hash:"f1b9280111c3a9e37e9f5050aebe070bd0bce073"}},mdxType:"Z3CodeBlock"}),(0,i.kt)("p",null,"Use instead"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"(define-fun R ((x A) (y A)) Bool ((_ partial-order 0) x y))\n")),(0,i.kt)("p",null,"We are using the index 0 to identify the partial order relation ",(0,i.kt)("inlineCode",{parentName:"p"},"R"),". To create a different relation that is also a partial order use\na different index, such as ",(0,i.kt)("inlineCode",{parentName:"p"},"(_ partial-order 1)"),"."),(0,i.kt)("h2",{id:"linear-order"},"Linear Order"),(0,i.kt)(n.Z,{input:{code:"(declare-sort A 0)\n(declare-fun R (A A) Bool)\n(assert (forall ((x A)) (R x x)))\n(assert (forall ((x A) (y A)) (=> (and (R x y) (R y x)) (= x y))))\n(assert (forall ((x A) (y A) (z A)) (=> (and (R x y) (R y z)) (R x z))))\n(assert (forall ((x A) (y A)) (or (R x y) (R y x))))",result:{output:"",error:"",status:"z3-ran",hash:"124151edcad19eb2d9572679e6a96c471a3f08b0"}},mdxType:"Z3CodeBlock"}),(0,i.kt)("p",null,"Use instead"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"(define-fun R ((x A) (y A)) Bool ((_ linear-order 0) x y))\n")),(0,i.kt)("h2",{id:"tree-order"},"Tree Order"),(0,i.kt)(n.Z,{input:{code:"(declare-sort A 0)\n(declare-fun R (A A) Bool)\n(assert (forall ((x A)) (R x x)))\n(assert (forall ((x A) (y A)) (=> (and (R x y) (R y x)) (= x y))))\n(assert (forall ((x A) (y A) (z A)) (=> (and (R x y) (R y z)) (R x z))))\n(assert (forall ((x A) (y A) (z A)) (=> (and (R x y) (R x z)) (or (R y z) (R z y)))))",result:{output:"",error:"",status:"z3-ran",hash:"c077d118bd320ae9bb336447bc93f6e76a857c5b"}},mdxType:"Z3CodeBlock"}),(0,i.kt)("p",null,"Use instead"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"(define-fun R ((x A) (y A)) Bool ((_ tree-order 0) x y))\n")),(0,i.kt)("h2",{id:"piecewise-linear-order"},"Piecewise Linear Order"),(0,i.kt)(n.Z,{input:{code:"(declare-sort A 0)\n(declare-fun R (A A) Bool)\n(assert (forall ((x A)) (R x x)))\n(assert (forall ((x A) (y A)) (=> (and (R x y) (R y x)) (= x y))))\n(assert (forall ((x A) (y A) (z A)) (=> (and (R x y) (R y z)) (R x z))))\n(assert (forall ((x A) (y A) (z A)) (=> (and (R x y) (R x z)) (or (R y z) (R z y)))))\n(assert (forall ((x A) (y A) (z A)) (=> (and (R y x) (R z x)) (or (R y z) (R z y)))))",result:{output:"",error:"",status:"z3-ran",hash:"ed4bec1a7df712ade8dbf01b217fda52b59376df"}},mdxType:"Z3CodeBlock"}),(0,i.kt)("p",null,"Use instead"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"(define-fun R ((x A) (y A)) Bool ((_ piecewise-linear-order 0) x y))\n")),(0,i.kt)("h1",{id:"transitive-closures"},"Transitive Closures"),(0,i.kt)("p",null,"The transitive closure of a relation is not first-order axiomatizable. However, the decision problem for ground formulas is decidable\nbecause for every binary relation ",(0,i.kt)("inlineCode",{parentName:"p"},"R")," over a finite domain, the transitive closure of it is defined over the finite graph of ",(0,i.kt)("inlineCode",{parentName:"p"},"R"),".\nThe small model property contrasts non-ground first-order formulas using transtive closure that are not first-order axiomatizable."),(0,i.kt)(n.Z,{input:{code:"(declare-sort A 0)\n(declare-fun R (A A) Bool)\n(declare-fun b () A)\n(declare-fun a () A)\n(declare-fun c () A)\n(assert (R a b))\n(assert (R b c))\n(assert (not ((_ transitive-closure R) a c)))\n(check-sat)",result:{output:"unsat\n",error:"",status:"z3-ran",hash:"2ff51c3e63045b1683e82b5d30c17b3975c88db8"}},mdxType:"Z3CodeBlock"}))}p.isMDXComponent=!0}}]);