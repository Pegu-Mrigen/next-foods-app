import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (

    <>
    
    <Hero />

    <HomeMenu />
    <section className="text-center my-16" id="about">
      <SectionHeaders subHeader="Our Story" mainHeader="About Us"  />
    <div className="max-w-md mx-auto text-gray-500 mt-4 flex flex-col gap-4">
    <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda earum ducimus voluptates tempora, molestiae quo, adipisci molestias dolores harum sapiente ipsum cumque officiis sunt ab in maxime autem illum quos?</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolores aperiam consequuntur ipsum ex eius cupiditate nobis repudiandae. Nulla suscipit quia fugiat eaque doloremque molestias sapiente, cumque numquam error tempore dolores voluptatum!</p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde deleniti totam veritatis soluta adipisci, impedit quod necessitatibus quae, consequuntur eveniet aliquam.</p>
    </div>
    </section>
    <section className="text-center mt-8" id="contact">
      <SectionHeaders subHeader={"Don\'t hesitate"} mainHeader="Contact Us"  />
      <div className="mt-8">
      <a href="tel:+917002274701" className="text-4xl underline text-gray-500">+917002274701</a>
      </div>
    </section>
    
    </>
   
  )
}
 