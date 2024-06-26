import footerImg from "@/assets/footer.png";
export default function Footer() {
  return (
    <div className="containerFooter">
      <img src={footerImg} alt="img Footer" className="footer__img" />
      <div className="footer__title">
        © Website - 2024 | All Right Reserved. Designed By Toor Team
      </div>
    </div>
  );
}
