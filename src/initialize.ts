// @ts-nocheck
/**
 * Initialize the Clarity instance
 *
 * @param appId - Clarity app id
 *
 * @see {@link https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup#install-manually}
 */
const initialize = (clarityId: string) => {
  var c = window,
    l = document,
    a = 'clarity',
    r = 'script',
    t,
    y;
  c[a] =
    c[a] ||
    function () {
      (c[a].q = c[a].q || []).push(arguments);
    };
  t = l.createElement(r);
  t.async = 1;
  t.src = 'https://www.clarity.ms/tag/' + clarityId;
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
};

export default initialize;
