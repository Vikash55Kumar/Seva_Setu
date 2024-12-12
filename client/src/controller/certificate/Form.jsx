import React from 'react'
import FormNavbar from './FormNavbar'
import CasteCertificateForm from './CasteFormCertificate'

export default function () {
    const user = {
        name: "Vikash Kumar",
      };
      const utrCode = "123456789ABC";

  return (
    <div>
    <FormNavbar user={user} utrCode={utrCode} />
    <CasteCertificateForm />
    </div>
  )
}
