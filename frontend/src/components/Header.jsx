
const Header = () => {
  return (
    <header className="w-100 d-flex flex-column
    justify-content-center align-items-center">
      <nav className="w-100 d-flex flex-row justify-content-between
      align-items-center mb-10 pt-3" style={{ padding:'0 10px',position:'sticky'}} >
        <img src="/url_icon.png" alt="sumz_logo" width={70}
        className="object-contain" style={{cursor:'pointer'}} onClick={()=>window.scrollTo(0)}/>
        <button type="button"
        onClick={()=> window.open('https://github.com/nikhil1610/fileUpload',"_blank")}
        className="black_btn"
        >
          Github
        </button>
      </nav>

      <h1 className="head_text">
        Share your files with <br className="max-md:hidden"/>
        <span className="orange_gradient">
          Bytesize URL</span>
      </h1>
    </header>
  )
}

export default Header