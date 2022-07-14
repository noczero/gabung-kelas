export const forgetPasswordEmail = (code) => {
  return {
    subject : 'Lupa Password',
    text :
    `Kamu baru saja melakukan permintaan lupa password, silahkan masukan ${code} sebagai kode verifikasi`
  }
}

export const confirmResetPasswordEmail = () => {
 return {
    subject : 'Perubahan Password',
    text :
    `Kamu baru saja berhasil melakukan perubahan password.
     Jika ternyata bukan kamu yang melakukan perubahan, silahkan hubungi kami.`
  }
}