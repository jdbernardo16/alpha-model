import{d as h,u as _,r as g,o as v,m as b,b as u,e as m,t as p,v as c,f as o,h as y,k as x,a as f}from"./index-kJ6JZcYt.js";const A={class:"min-h-screen bg-gradient-to-b from-gray-100 to-white"},U={key:0,class:"flex justify-center items-center min-h-screen"},T={key:1,class:"flex justify-center items-center min-h-screen text-red-500"},w={key:2},M={class:"max-w-6xl mx-auto px-4 py-16"},k={class:"grid grid-cols-1 md:grid-cols-2 gap-12 items-center"},L={class:"rounded-lg overflow-hidden shadow-xl"},E=["src","alt"],j={class:"text-3xl font-bold mb-6 text-gray-900"},B={class:"space-y-4 text-gray-800"},D=["innerHTML"],q=`
    query getAbout {
        page(id: "about-us", idType: URI) {
            id
            title
            slug
            ... on WithAcfAboutUs {
                aboutUs {
                    frame1 {
                        image {
                            node {
                                id
                                sourceUrl
                                altText
                            }
                        }
                        title
                        description
                    }
                }
            }
        }
    }
`,G=h({__name:"AboutView",setup(H){const a=_("aboutPageData",null),s=g(!0),n=g(null);return v(()=>{a.value?s.value=!1:s.value=!0,(async()=>{var l,r;const i=s.value;n.value=null;try{const e=await x.post("https://admin.alphatalentmanagement.com/graphql",{query:q});(r=(l=e.data.data)==null?void 0:l.page)!=null&&r.aboutUs?a.value=e.data.data.page.aboutUs:console.warn("About Us data not found or unexpected structure:",e.data),e.data.errors&&(console.error("GraphQL errors fetching About Us:",e.data.errors),n.value||(n.value=new Error(e.data.errors.map(d=>d.message).join(", "))))}catch(e){console.error("Error fetching About Us data:",e),n.value||(n.value=e)}finally{i&&(s.value=!1)}})()}),b(a,t=>{var i,l;if(t!=null&&t.frame1){const r=`${t.frame1.title||"About Us"} - Alpha Talent Management`,e=t.frame1.description?t.frame1.description.replace(/<[^>]*>?/gm,"").substring(0,160)+"...":"Learn more about Alpha Talent Management, our mission, and our team.",d=((l=(i=t.frame1.image)==null?void 0:i.node)==null?void 0:l.sourceUrl)||"/images/AATM_logo.png";f({title:r,meta:[{name:"description",content:e},{property:"og:title",content:r},{property:"og:description",content:e},{property:"og:type",content:"website"},{property:"og:image",content:d},{property:"og:url",content:window.location.href},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:r},{name:"twitter:description",content:e},{name:"twitter:image",content:d}],link:[{rel:"canonical",href:window.location.href}]})}else f({title:"About Us - Alpha Talent Management",meta:[{name:"description",content:"Learn more about Alpha Talent Management."}]})},{immediate:!0,deep:!0}),(t,i)=>(u(),m("div",A,[s.value?(u(),m("div",U,"Loading...")):n.value?(u(),m("div",T," Error loading content: "+p(n.value.message),1)):c(a)?(u(),m("div",w,[o("div",M,[o("div",k,[o("div",L,[o("img",{src:c(a).frame1.image.node.sourceUrl,alt:c(a).frame1.image.node.altText,class:"w-full h-full object-cover"},null,8,E)]),o("div",null,[o("h2",j,p(c(a).frame1.title),1),o("div",B,[o("div",{class:"leading-relaxed",innerHTML:c(a).frame1.description},null,8,D)])])])])])):y("",!0)]))}});export{G as default};
