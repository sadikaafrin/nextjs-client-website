export default function Hero() {
  return (
   <div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      "url(https://ulleo.com/hubfs/Interior%20Design/The%20Impact%20of%20Furniture%20on%20Interior%20Design.png)",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      {/* <h1 className="mb-5 text-5xl font-bold">Hello there</h1> */}
      <p className="mb-5 text-5xl font-bold">
        Set your trends aesthetically stylish
      </p>
      <button className="btn bg-gray-700 btn-primary rounded-3xl">Get Started</button>
    </div>
  </div>
</div>
  );
}
