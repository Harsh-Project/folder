export function startCountdown(dob) {
    if (dob) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
      let remain;
  
      const currentYear = new Date().getFullYear();
      let bDay = new Date(dob).getDate();
      bDay = bDay < 10 ? "0" + bDay : bDay;
      let bMonth = new Date(dob).getMonth() + 1;
      bMonth = bMonth < 10 ? "0" + bMonth : bMonth;
  
      let birthday = currentYear + "-" + bMonth + "-" + bDay;
      let countDown = new Date(birthday).getTime();
  
      const now = new Date().getTime();
      let distance = countDown - now;
  
      if (distance < 0) {
        birthday = currentYear + 1 + "-" + bMonth + "-" + bDay;
        countDown = new Date(birthday).getTime();
        distance = countDown - now;
      }
  
      const remainingDays = Math.floor(distance / day);
      remain = remainingDays;
  
      return remain;
    }
  }