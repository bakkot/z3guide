"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4364],{9059:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var s=t(3117),i=(t(7294),t(3905)),o=t(7689);const a={title:"A Small Case Study",sidebar_position:6},r=void 0,l={unversionedId:"optimization/asmallcasestudy",id:"optimization/asmallcasestudy",title:"A Small Case Study",description:"In collaboration with Anh-Dung Phan.",source:"@site/docs/03 - optimization/06 - asmallcasestudy.md",sourceDirName:"03 - optimization",slug:"/optimization/asmallcasestudy",permalink:"/z3guide/docs/optimization/asmallcasestudy",draft:!1,editUrl:"https://github.com/microsoft/z3guide/tree/main/website/docs/03 - optimization/06 - asmallcasestudy.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{title:"A Small Case Study",sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"Combining Objectives",permalink:"/z3guide/docs/optimization/combiningobjectives"},next:{title:"Advanced Topics",permalink:"/z3guide/docs/optimization/advancedtopics"}},d={},c=[{value:"Problem description",id:"problem-description",level:2},{value:"Boolean encoding",id:"boolean-encoding",level:3},{value:"Integer encoding",id:"integer-encoding",level:3}],x={toc:c};function u(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,s.Z)({},x,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"In collaboration with Anh-Dung Phan."),(0,i.kt)("h2",{id:"problem-description"},"Problem description"),(0,i.kt)("p",null,"Use the problem of virtual machine placement as an example. Assume that we have three virtual machines (VMs) which require 100, 50 and 15 GB hard disk respectively. There are three servers with capabilities 100, 75 and 200 GB in that order. Find out a way to place VMs into servers in order to"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Minimize the number of servers used"),(0,i.kt)("li",{parentName:"ul"},"Minimize the operation cost (the servers have fixed daily costs 10, 5 and 20 USD respectively.)")),(0,i.kt)("h3",{id:"boolean-encoding"},"Boolean encoding"),(0,i.kt)("p",null,"We start with a boolean encoding. Let xij denote that VM i is put into server j and yj denote that server j is in use."),(0,i.kt)(o.Z,{input:{code:"(declare-const x11 Bool)\n(declare-const x12 Bool)\n(declare-const x13 Bool)\n(declare-const x21 Bool)\n(declare-const x22 Bool)\n(declare-const x23 Bool)\n(declare-const x31 Bool)\n(declare-const x32 Bool)\n(declare-const x33 Bool)\n\n(declare-const y1 Bool)\n(declare-const y2 Bool)\n(declare-const y3 Bool)\n\n\n; We express that a virtual machine is on exactly one server by simply converting it to integer constraints.\n(assert (= (+ x11 x12 x13) 1))\n(assert (= (+ x21 x22 x23) 1))\n(assert (= (+ x31 x32 x33) 1))\n\n; And an used server is implied by having a VM on it.\n\n(assert (and (implies y1 x11) (implies y1 x21) (implies y1 x31)))\n(assert (and (implies y2 x12) (implies y2 x22) (implies y2 x32)))\n(assert (and (implies y3 x13) (implies y3 x23) (implies y3 x33)))\n\n; Capability constraints are quite natural to add.\n\n(assert (<= (+ (* 100 x11) \n               (* 50 x21) \n               (* 15 x31)) \n            (* 100 y1)))\n(assert (<= (+ (* 100 x12) \n               (* 50 x22) \n               (* 15 x32)) \n            (* 75 y2)))\n(assert (<= (+ (* 100 x13) \n               (* 50 x23) \n               (* 15 x33)) \n            (* 200 y3)))\n\n; Optimization goals are expressed implicitly via assert-soft command.\n(assert-soft (not y1) :id num_servers)\n(assert-soft (not y2) :id num_servers)\n(assert-soft (not y3) :id num_servers)\n\n(assert-soft (not y1) :id costs :weight 10)\n(assert-soft (not y2) :id costs :weight 5)\n(assert-soft (not y3) :id costs :weight 20)\n\n(check-sat)\n(get-model)\n(get-objectives)",result:{output:"sat\n(\n  (define-fun x11 () Bool\n    false)\n  (define-fun x13 () Bool\n    true)\n  (define-fun x21 () Bool\n    false)\n  (define-fun x23 () Bool\n    true)\n  (define-fun x31 () Bool\n    false)\n  (define-fun x33 () Bool\n    true)\n  (define-fun y1 () Bool\n    false)\n  (define-fun y2 () Bool\n    false)\n  (define-fun y3 () Bool\n    true)\n  (define-fun x12 () Bool\n    false)\n  (define-fun x22 () Bool\n    false)\n  (define-fun x32 () Bool\n    false)\n)\n(objectives\n (num_servers 1)\n (costs 20)\n)\n",error:"",status:"z3-ran",hash:"82d69a6ab323c2adccc24824fb971c79ba425885"}},mdxType:"Z3CodeBlock"}),(0,i.kt)("p",null,"The assert-soft command represents MaxSMT which tries to maximize the weighted sum of boolean expressions belonged to the same id. Since we are doing minimization, negation is needed to take advantage of MaxSMT support."),(0,i.kt)("h3",{id:"integer-encoding"},"Integer encoding"),(0,i.kt)("p",null,"In this example, the boolean encoding is not really natural. Most of the constraints is of arithmetic form, it makes more sense to express them using integer arithmetic. Here is a similar encoding using integer arithmetic."),(0,i.kt)(o.Z,{input:{code:"(declare-const x11 Int)\n(declare-const x12 Int)\n(declare-const x13 Int)\n(declare-const x21 Int)\n(declare-const x22 Int)\n(declare-const x23 Int)\n(declare-const x31 Int)\n(declare-const x32 Int)\n(declare-const x33 Int)\n\n(declare-const y1 Int)\n(declare-const y2 Int)\n(declare-const y3 Int)\n\n(assert (and (>= x11 0) (>= x12 0) (>= x13 0) \n             (>= x21 0) (>= x22 0) (>= x23 0)\n             (>= x31 0) (>= x32 0) (>= x33 0)))\n             \n(assert (and (<= y1 1) (<= y2 1) (<= y3 1)))\n\n(assert (= (+ x11 x12 x13) 1))\n(assert (= (+ x21 x22 x23) 1))\n(assert (= (+ x31 x32 x33) 1))\n\n(assert (and (>= y1 x11) (>= y1 x21) (>= y1 x31)))\n(assert (and (>= y2 x12) (>= y2 x22) (>= y2 x32)))\n(assert (and (>= y3 x13) (>= y3 x23) (>= y3 x33)))\n\n(assert (<= (+ (* 100 x11) (* 50 x21) (* 15 x31)) (* 100 y1)))\n(assert (<= (+ (* 100 x12) (* 50 x22) (* 15 x32)) (* 75 y2)))             \n(assert (<= (+ (* 100 x13) (* 50 x23) (* 15 x33)) (* 200 y3)))\n\n(minimize (+ y1 y2 y3))\n(minimize (+ (* 10 y1) (* 5 y2) (* 20 y3)))\n\n;(set-option :opt.priority pareto)\n(check-sat)\n(get-model)\n(get-objectives)",result:{output:"sat\n(\n  (define-fun x33 () Int\n    1)\n  (define-fun x13 () Int\n    1)\n  (define-fun y2 () Int\n    0)\n  (define-fun y3 () Int\n    1)\n  (define-fun y1 () Int\n    0)\n  (define-fun x32 () Int\n    0)\n  (define-fun x22 () Int\n    0)\n  (define-fun x12 () Int\n    0)\n  (define-fun x23 () Int\n    1)\n  (define-fun x31 () Int\n    0)\n  (define-fun x21 () Int\n    0)\n  (define-fun x11 () Int\n    0)\n)\n(objectives\n ((+ y1 y2 y3) 1)\n ((+ (* 10 y1) (* 5 y2) (* 20 y3)) 20)\n)\n",error:"",status:"z3-ran",hash:"b579a35e549f7aa903fb429905f1cb722ca950b5"}},mdxType:"Z3CodeBlock"}),(0,i.kt)("p",null,"The capability constraints and goals are easier to express than those of boolean encoding. However, we need to add extra constraints to ensure that only 0-1 integers are allowed in the model. It is also interesting to see different results by choosing various ways of combining objectives. You can uncomment the set-option command and take a look at results."))}u.isMDXComponent=!0}}]);