import LoginPage from "./components/LoginPage";

export default function Login() {
  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: "url('/denim.jpg')",
        backgroundPosition: "center",
      }}
    >

        <LoginPage />
    </div>
  );
}
