export function getFormData(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);

    const author = formData.get('author');
    const title = formData.get('title');

    return { author, title };
}