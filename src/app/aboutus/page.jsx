export default function AboutusPage() {
  return (
    <div>
      <h2 className="text-center text-3xl">
        <span className="underline">About</span> Us
      </h2>
      <p className="text-center mt-2">
        HATIL is a fast-growing Global Furniture Brand with customers and
        connoisseurs around the globe. The brand presents an impeccable range of
        wooden furniture products manufactured from the best-sourced materials
        and with a deft touch of seasoned artisanship.
      </p>
      <img
        className="mt-4 w-full"
        src="https://hatil-image.s3.ap-southeast-1.amazonaws.com/FooterBannerImage/404-Image.png"
        alt=""
      />
      <div className="grid grid-cols-1 md:grid-cols-12 mt-4 gap-3">
        <div className="md:col-span-3">
          <div className="text-center">
            <img
              src="https://hatil.com/images/about.jpg"
              alt="Late Al-Haj Habibur Rahman"
              className="w-full rounded-lg shadow-md"
            />
            <h2 className="text-xl font-bold mt-4">
              Late Al-Haj Habibur Rahman [1939-2005]
            </h2>
            <p className="text-gray-600 mt-2">
              Founder of H.A. Timber Industries Ltd.
            </p>
          </div>
        </div>
        <div className="md:col-span-9">
          <div className="bg-white p-6 rounded-lg ">
            <p className="text-gray-700 leading-relaxed">
              HATIL traces its roots to H.A. Timber Industries Ltd, a company
              established in 1963 by late Al-Haj Habibur Rahman. Following his
              footsteps, HATIL, as a singular furniture brand, came into being
              under the leadership of Selim H. Rahman, a veteran and visionary
              leader in country's furniture industry. Over the years, HATIL made
              itself a synonym to Elegant, Contemporary and Affordable furniture
              collection. Outstanding product quality and design backed by
              unique customer service are a few traits that helped HATIL lead
              being in the front. It's worth mentioning that to ensure the best
              possible quality HATIL has been practicing Japanese Quality
              Management Philosophy "Kaizen" since 2007. And, being an
              environment-sensible company. All these things contributed in a
              great way making HATIL a favorite name across markets like US,
              Canada, Australia, Saudi Arabia, Kuwait, UAE, Thailand, Egypt,
              Russia, Nepal, Bhutan and India. In Bangladesh market, HATIL
              Furniture has been a proud awardee of HSBC-Daily Star Climate
              Award, 2013 in Green Operation Category.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
