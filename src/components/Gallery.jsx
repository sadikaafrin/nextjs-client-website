export default function Gallery() {
    return (
           <div className='m-3 max-w-7xl mx-auto'>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white-900 mb-8 mt-4 text-center">
          OUR GALLERY
        </h1>
         <div className="grid grid-cols-2 gap-2">
            <div>
                <img 
                    className="h-[380px] w-[600px] max-w-full rounded-lg " 
                    src="https://bohubd.com/cdn/shop/files/D-Doublebed-0_1100x.jpg?v=1724137416" 
                    alt="Gallery image 1" 
                />
            </div>
            <div>
                <img 
                    className="h-[380px] w-[600px]  max-w-full rounded-lg" 
                    src="https://bohubd.com/cdn/shop/files/BOHU-56961-1_1100x.jpg?v=1724137506" 
                    alt="Gallery image 2" 
                />
            </div>
            <div>
                <img 
                    className="h-[380px] w-[600px] max-w-full rounded-lg" 
                    src="https://bohubd.com/cdn/shop/files/E-Cabinets-Tallglasscase-1_1100x.jpg?v=1724137368" 
                    alt="Gallery image 3" 
                />
            </div>
            <div>
                <img 
                    className="h-[380px] w-[600px] max-w-full rounded-lg" 
                    src="https://bohubd.com/cdn/shop/files/CdiningtableClassic1-3_1100x.jpg?v=1736922651" 
                    alt="Gallery image 4" 
                />
            </div>
        </div>
       </div>
    )
}
