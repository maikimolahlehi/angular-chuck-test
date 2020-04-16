declare var $: any;

export const scrollTop = () => {
    $('html, body').animate({ scrollTop: 90 }, 2000);
};
