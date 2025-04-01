import{d as c,r as l,o as d,a as u,b as a,e as o,t as r,f as e,h as m}from"./index-C6BRd3FG.js";const _={class:"min-h-screen bg-gradient-to-b from-gray-100 to-white"},g={key:0,class:"flex justify-center items-center min-h-screen"},h={key:1,class:"flex justify-center items-center min-h-screen text-red-500"},f={key:2},v={class:"max-w-6xl mx-auto px-4 py-16"},p={class:"grid grid-cols-1 md:grid-cols-2 gap-12 items-center"},x={class:"rounded-lg overflow-hidden shadow-xl"},y=["src","alt"],b={class:"text-3xl font-bold mb-6 text-gray-900"},w={class:"space-y-4 text-gray-800"},T=["innerHTML"],U=`
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
`,j=c({__name:"AboutView",setup(k){const t=l(null),i=l(!0),n=l(null);return d(async()=>{try{const s=await u.post("https://admin.alphatalentmanagement.com/graphql",{query:U});t.value=s.data.data.page.aboutUs}catch(s){n.value=s}finally{i.value=!1}}),(s,A)=>(a(),o("div",_,[i.value?(a(),o("div",g,"Loading...")):n.value?(a(),o("div",h," Error loading content: "+r(n.value.message),1)):t.value?(a(),o("div",f,[e("div",v,[e("div",p,[e("div",x,[e("img",{src:t.value.frame1.image.node.sourceUrl,alt:t.value.frame1.image.node.altText,class:"w-full h-full object-cover"},null,8,y)]),e("div",null,[e("h2",b,r(t.value.frame1.title),1),e("div",w,[e("div",{class:"leading-relaxed",innerHTML:t.value.frame1.description},null,8,T)])])])])])):m("",!0)]))}});export{j as default};
