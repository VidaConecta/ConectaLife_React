function Footer() {
  const anoAtual = new Date().getFullYear();
 
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <p className="footer__brand">♥ ConectaLife</p>
          <p className="footer__tagline">
            Seguro de vida simples e acessível para estudantes e
            desenvolvedores.
          </p>
        </div>
 
        <div id="contato">
          <h3>Contato</h3>
          <p>contato@conectalife.com</p>
          <p>(00) 0000-0000</p>
        </div>
 
        <div id="apolice">
          <h3>Apólice</h3>
          <p>Consulte sua apólice na área do cliente</p>
        </div>
      </div>
 
      <div className="footer__bottom">
        ConectaLife &copy; {anoAtual} — Todos os direitos reservados
      </div>
    </footer>
  );
}
 
export default Footer;