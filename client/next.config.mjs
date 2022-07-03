/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    app: {
        name: 'Gabung Kelas: Situs Belajar Mengajar Kelas Daring',
        serverURL: process.env.BASE_SERVER_URL || 'http://localhost:8080',
        apiURL: process.env.BASE_API_URL_PREFIX || 'http://localhost:8080/api' , // will use in axios request
        clientURL: process.env.BASE_CLIENT_URL || 'http://localhost:3001'
    },
    contact : {
        twitter : 'https://twitter.com/@gabungkelas',
        instagram: 'https://instagram.com/gabungkelas',
        phoneNumber : '+62 822 xxx xxx xxx',
        address : 'Jl. Alamat, Kabupatan, Kota, Provinsi, Negara',
        email : 'cs@gabungkelas.id'
    }
}

export default nextConfig