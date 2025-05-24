import { assets } from "../assets/assets";


export default function Home() {
  return (
    <>
      <style>{`
  @keyframes floatUp {
    0% {
      transform: translateY(100%);
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-120%);
      opacity: 0;
    }
  }

  @keyframes floatDown {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  .float-up {
    animation: floatUp 15s linear infinite;
  }

  .float-down {
    animation: floatDown 15s linear infinite;
  }

  @keyframes infiniteScroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-infinite-scroll {
  animation: infiniteScroll 30s linear infinite;
}

`}</style>

      <div className="relative h-screen w-full font-sans overflow-hidden">
        {/* Black side with lower angle diagonal */}
        <div
          className="absolute inset-0 bg-black z-0"
          style={{
            clipPath: "polygon(0 0, 30% 0, 100% 100%, 0 100%)",
          }}
        />

        {/* Green side filling the rest */}
        <div
          className="absolute inset-0 bg-green-500 z-0"
          style={{
            clipPath: "polygon(30% 0, 100% 0, 100% 100%, 46.7% 100%, 45% 90%)",
          }}
        />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col md:flex-row h-full w-full">
          {/* Left Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-6 md:pl-24 py-12 space-y-6 md:space-y-8 text-white">
            <div className="flex items-center space-x-3">
              <img src={assets.moodify} alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-500">
                Moodify
              </h1>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug sm:leading-tight md:leading-tight">
              MUSIC THAT <br /> MATCHES <br /> YOUR SOUL
            </h2>

            <button
  onClick={() => {
    
  console.log("Redirecting to Spotify login...");
    window.location.href = "http://localhost:3000/login";
  }}
  className="bg-green-500 hover:bg-green-400 text-black font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition"
>
  Log In With Spotify
</button>
          </div>

          <div className="w-full md:w-1/2 relative flex items-center justify-center py-8 md:py-0 overflow-hidden">

      
           <img
            src={assets.phone}
            alt="Floating Phone"
            className="h-[28rem] sm:h-[32rem] md:h-[36rem] lg:h-[40rem] object-contain float-up absolute bottom-0 left-0"
            />

           <img
            src={assets.phone}
            alt="Floating Phone 2"
            className="h-[28rem] sm:h-[32rem] md:h-[36rem] lg:h-[40rem] object-contain float-down absolute top-0 right-0"
            />
          </div>
        </div>
        {/* Gradient Overlay at Bottom */}
<div className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none" 
     style={{ background: "linear-gradient(to bottom, transparent, rgb(23, 23, 23))" }} />
      </div>
      
      {/* Scroll-down Section */}
     <div
      className="flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-16 text-white gap-10"
      style={{ backgroundColor: 'rgb(23, 23, 23)' }}
      >
 <div className="
  rounded-full p-1
  hover:shadow-[0_0_30px_5px_rgba(72,187,120,0.5)]
  border-4 border-green-500 transition-transform duration-500 ease-in-out hover:scale-105
">
  <img
    src={assets.girl}
    alt="App Preview"
    className="w-2/3 md:w-full max-w-2/3object-contain rounded-full"
  />
</div>

  {/* Text Right */}
  <div className="w-full md:w-1/2 space-y-6">
    <h2 className="text-3xl md:text-4xl font-bold">Discover Your Mood</h2>
    <p className="text-lg leading-relaxed text-gray-500">
      Let Moodify read your vibes and create the perfect playlist tailored to your feelings.
      Whether you&apos;re feeling joyful, mellow, or anything in between—Moodify matches your soul to sound.
    </p>
    <button
  className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2.5 px-6 rounded-full transition"
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>
  Learn More
</button>
  </div>
  </div>

{/* Infinite Carousel Section */}
<div className="pt-8 pb-24 overflow-hidden bg-[linear-gradient(to_bottom,_rgb(23,23,23),_black)]">
  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
    Discover Moodify
  </h2>

  <div className="relative w-full overflow-hidden">
    <div className="flex animate-infinite-scroll gap-6 w-max">
      {[...Array(2)].flatMap(() =>
        [assets.cover1, assets.cover2, assets.cover3, assets.cover4, assets.cover5].map((img, i) => (
         <div
           key={i}
           className="aspect-square min-w-[200px] sm:min-w-[250px] lg:min-w-[300px] bg-green-100 rounded-xl shadow-lg overflow-hidden"
        >
        <img
           src={img}
           alt={`Card ${i + 1}`}
           className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
        />
</div>

        ))
      )}
    </div>
  </div>
</div>

    </>
  );
}
