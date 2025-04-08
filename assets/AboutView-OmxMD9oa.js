import{d as _,u as h,r as u,o as v,a as n,b as l,t as m,v as r,e as t,g as p,j as b}from"./index-D-ww7N1e.js";const x={class:"min-h-screen bg-gradient-to-b from-gray-100 to-white"},y={key:0,class:"flex justify-center items-center min-h-screen"},U={key:1,class:"flex justify-center items-center min-h-screen text-red-500"},A={key:2},w={class:"max-w-6xl mx-auto px-4 py-16"},T={class:"grid grid-cols-1 md:grid-cols-2 gap-12 items-center"},j={class:"rounded-lg overflow-hidden shadow-xl"},k=["src","alt"],E={class:"text-3xl font-bold mb-6 text-gray-900"},L={class:"space-y-4 text-gray-800"},B=["innerHTML"],D=`
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
`,V=_({__name:"AboutView",setup(q){const a=h("aboutPageData",null),o=u(!0),s=u(null);return v(()=>{a.value?o.value=!1:o.value=!0,(async()=>{var c,d;const i=o.value;s.value=null;try{const e=await b.post("https://admin.alphatalentmanagement.com/graphql",{query:D});(d=(c=e.data.data)==null?void 0:c.page)!=null&&d.aboutUs?a.value=e.data.data.page.aboutUs:console.warn("About Us data not found or unexpected structure:",e.data),e.data.errors&&(console.error("GraphQL errors fetching About Us:",e.data.errors),s.value||(s.value=new Error(e.data.errors.map(g=>g.message).join(", "))))}catch(e){console.error("Error fetching About Us data:",e),s.value||(s.value=e)}finally{i&&(o.value=!1)}})()}),(f,i)=>(n(),l("div",x,[o.value?(n(),l("div",y,"Loading...")):s.value?(n(),l("div",U," Error loading content: "+m(s.value.message),1)):r(a)?(n(),l("div",A,[t("div",w,[t("div",T,[t("div",j,[t("img",{src:r(a).frame1.image.node.sourceUrl,alt:r(a).frame1.image.node.altText,class:"w-full h-full object-cover"},null,8,k)]),t("div",null,[t("h2",E,m(r(a).frame1.title),1),t("div",L,[t("div",{class:"leading-relaxed",innerHTML:r(a).frame1.description},null,8,B)])])])])])):p("",!0)]))}});export{V as default};
