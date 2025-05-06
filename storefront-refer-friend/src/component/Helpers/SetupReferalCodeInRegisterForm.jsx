export const SetupReferalCodeInRegisterForm = (code) => {
    let registerForm = window.document.querySelector('form#create_customer');
    if(registerForm){
      let flitsReferralCode = window.document.createElement('input');
      flitsReferralCode.type = 'hidden';
      flitsReferralCode.name = 'customer[note][flits_referral_code]';
      flitsReferralCode.value = code;
      if(registerForm.querySelectorAll('[name="customer[note][flits_referral_code]"]').length > 0){
        registerForm.querySelector('[name="customer[note][flits_referral_code]"]').value = code;
      }else{
        registerForm.appendChild(flitsReferralCode);
      }
    }
}