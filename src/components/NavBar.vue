<template lang="ru">
    <div class="container">
        <div class="logo-box">
            <a href="/">
                <img src="@/data/images/logo.png">
            </a>
        </div>
        <nav>
            <ul>
                <li><a href="">home</a></li>
                <li><a href="">work</a></li>
                <li><a href="">product</a></li>
                <li><a href="">about</a></li>
                <li><a href="">contact</a></li>
            </ul>
        </nav>
    </div>
      
</template>
<script>
export default {
}
</script>
<style scoped lang="scss">
img {
    width: 50px;
    margin-top: auto;
}
  .container {
    z-index: 100;
    padding: 0 0px;
    height: 110px;
    width: 100%;
    margin: 0 auto;
    background-color: rgb(90, 128, 199);
    position: static;
  }
  .logo-box {
    float: left;
    margin-right: 20px;
    padding: 30px;
  }
  .logo-box a {
    outline: none;
    display: block;
  }
  .logo-box img {display: block;}
  nav {
    margin-left: 30%;
    margin-right: auto;
    overflow: hidden;
  }
  ul {
    margin-top: 20px;
    list-style: none;
    padding: 0;
    align-items: right;
  }
  nav li {
    display: inline-block;
    margin-left: 25px;
    height: 70px;
    line-height: 70px;
    transition: .5s linear;
  }
  nav a {
    font-size: 20px;
    text-decoration: none;
    display: block;
    position: sticky;
    color: #ffffff;
    text-transform: uppercase;
  }
  nav a:after {
    content: "";
    width: 0;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: 15px;
    background: rgb(255, 255, 255);
    transition: width .5s linear;  
  }
  nav a:hover:after {width: 100%;}
  
  @media screen and (max-width: 660px) {
    header {text-align: center;}
    .logo-box {
      float: none;
      display: inline-block;
      margin: 0 0 16px 0;
    }
    ul {float: none;}
    nav li:first-of-type {margin-left: 0;}
  }
  @media screen and (max-width: 550px) {
  nav {overflow: visible;}
  nav li {
    display: block;
    margin: 0;
    height: 40px;
    line-height: 40px;
  }
  nav li:hover {background: rgba(0,0,0,.1);}
  nav a:after {content: none;}
  }
</style>