export const FileFieldReset = (fileFieldSelector, errorMessage) => {
    if(fileFieldSelector)
    fileFieldSelector.value = null;
    var $customerCustomFieldRow = fileFieldSelector?.closest('.customer-custom-field-row');
    var noFileLabel = $customerCustomFieldRow?.querySelector('.file-name-label').getAttribute('data-file-label');
    if($customerCustomFieldRow){
    $customerCustomFieldRow.querySelector('.file-name-label').innerHTML = noFileLabel;
    $customerCustomFieldRow.querySelector('.file-upload-spinner').classList.add('flits-hide');}
}