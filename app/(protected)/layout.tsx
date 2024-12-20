import Footer from "../component/layout/Footer";
import Header from "../component/layout/Header";

export default function ProtectedLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    );
}