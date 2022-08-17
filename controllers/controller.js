class Controller {
  static index(req, res) {
    res.send('masuk')
  }
  static formRegis(req, res) {
    res.send('masuk a')
  }
  static createRegis(req, res) {
    res.send('masuk b')
  }
  static formLogin(req, res) {
    res.send('masuk c')
  }
  static createLogin(req, res) {
    res.send('masuk d')
  }
  static formProfile(req, res) {
    res.send('masuk e')
  }
  static createProfile(req, res) {
    res.send('masuk f')
  }
  static showProduct(req, res) {
    res.send('masuk g')
  }
  static productCategoryId(req, res) {
    res.send('masuk h')
  }
  static productUserId(req, res) {
    res.send('masuk i')
  }
  static formAddProduct(req, res) {
    res.send('masuk j')
  }
  static createProduct(req, res) {
    res.send('masuk k')
  }
  static deleteProduct(req, res) {
    res.send('masuk l')
  }
}

module.exports = Controller