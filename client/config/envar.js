
export const envar = {
    app: {
        name: 'Gabung Kelas: Situs Belajar Mengajar Kelas Daring',
        serverURL: process.env.BASE_SERVER_URL,
        apiURL: `${process.env.BASE_SERVER_URL}/${process.env.BASE_API_URL_PREFIX}`,
        clientURL: process.env.BASE_CLIENT_URL,
    }
}

