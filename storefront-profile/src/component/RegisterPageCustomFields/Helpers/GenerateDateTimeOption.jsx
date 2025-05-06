export const GenerateDateTimeOption = (start, end, elem) => {
    for (let i = start; i <= end; i++) {
        let opt = window.document.createElement('option');
        let val = (i < 10) ? '0' + i : i;
        opt.setAttribute('value', val);
        opt.innerHTML = val;
        elem.appendChild(opt);
    }
}