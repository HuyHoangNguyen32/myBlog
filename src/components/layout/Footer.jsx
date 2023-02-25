function Footer() {

  return (
    <footer id="main-footer" className="bg-dark fixed-bottom mt-5">
    <div className="container">
      <div className="row">
        <div className="text-center">
          <p style={{color: '#fff'}}>&copy;
            <span>{new Date().getFullYear()}</span> My Blog
          </p>
        </div>
      </div>
    </div>
  </footer>
  );
}


export default Footer;
