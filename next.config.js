/** @type {import('next').NextConfig} */
const nextConfig = {

    images:{
        remotePatterns:[
            
            {protocol:"https",hostname:"*.googleusercontent.com"},
            {protocol:"https",hostname:"firebasestorage.googleapis.com"},
        ]
    },
    // webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = { fs: false };
  
      return config;
    },
}

module.exports = nextConfig


// module.exports = {
//     webpack5: true,
//     webpack: (config) => {
//       config.resolve.fallback = { fs: false };
  
//       return config;
//     },
//   };
  
