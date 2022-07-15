export const forgetPasswordEmail = (data) => {
    return {
        subject: 'Lupa Password',
        text:
            `Hi ${data.fullName}.
            Kamu baru saja melakukan permintaan lupa password, silahkan masukan ${data.code} sebagai kode verifikasi`
    }
}

export const confirmResetPasswordEmail = (data) => {
    return {
        subject: 'Perubahan Password',
        text:
            `Hi ${data.fullName}.
            Kamu baru saja berhasil melakukan perubahan password.
            Jika ternyata bukan kamu yang melakukan perubahan, silahkan hubungi kami.`
    }
}

export const accountVerificationEmail = (data) => {
    return {
        subject: 'Verifikasi Akun',
        text:
            `Hi ${data.fullName}. 
            Kamu baru saja mendaftar di Gabung Kelas.
            Kami akan memverifikasi akun kamu dengan kode verifikasi ${data.emailVerificationCode}.
    `
    }
}

export const accountVerificationSuccessEmail = (data) => {
    return {
        subject: 'Akun Terverifikasi',
        text:
            `Hi ${data.fullName}. 
            Akun kamu sudah terverifikasi, nikmati belajar dan mengajar di platform kami.
        `
    }
}