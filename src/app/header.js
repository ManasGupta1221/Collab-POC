import Image from "next/image";

export default function Header() {

    return (
      
        <header
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            backgroundColor: "rgb(0,17,42)",
            zIndex: 50,
            boxShadow: "0 1px 8px 0 rgba(0,0,0,0.03)",
            display: "flex",
            alignItems: "center",
            height: "56px",
            padding: "0 24px",
          }}
        >
          <Image
            src="/icon.png"
            alt="Logo"
            width={60}
            height={60}
            style={{ objectFit: "contain" }}
            priority
          />
        </header>
      
          
          
   
    )
}