const userInfo = accessToken =>
  toJson(fetch(`https://graph.facebook.com/me?access_token=${accessToken}`));
const userPicture = accessToken =>
  toJson(
    fetch(
      `https://graph.facebook.com/me/picture?access_token=${accessToken}&redirect=0&type=large`
    )
  );
const toJson = promise => promise.then(data => data.json());
const Api = { userInfo, userPicture };
export default Api;
