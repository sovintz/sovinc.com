export default function ({redirect, $axios}) {

  const ContactFormData = {
    name: 'Business Card QR code',
    email: 'lan@sovinc.com',
    message: 'Somebody scanned your business card QR code',
    captchaToken: ''

  }

  // Send email
  $axios.post('https://formsubmit.co/ajax/lan@sovinc.com', ContactFormData)
    .finally(() => {
    })

  // Redirect
  return redirect('/')
}
