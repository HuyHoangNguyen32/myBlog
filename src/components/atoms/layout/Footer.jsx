import styled from "styled-components";

function Footer() {
  return (
    <FooterStyle>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <p style={{color: "#fff"}}>Hello</p>
          </div>
        </div>
      </nav>
    </FooterStyle>
  );
}

const FooterStyle = styled.div`
  text-align: center;
  padding: 8px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
`

export default Footer;
