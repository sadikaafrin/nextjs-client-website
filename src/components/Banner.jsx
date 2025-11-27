export default function Banner() {
    return (
          <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://admin.hatimfurniturebd.com/images/slide/1762776398343.jpg"
          className="w-full h-[500px]"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/d712ad173298245.648dc2797a5eb.jpg"
          className="w-full h-[500px]"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
    )
}
