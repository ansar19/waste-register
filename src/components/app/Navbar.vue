<template>
  <d-navbar
    toggleable="md"
    type="dark"
    theme="primary"
    class="align-items-stretch flex-md-nowrap p-0 navbar navbar-light"
  >
    <div class="navbar-left">
      <a href="#" class="nav-link" @click.prevent="$emit('click')">
        <i class="material-icons black-text">dehaze</i>
      </a>
      <d-navbar-brand>
        <span class="d-md-inline ml-1">
          {{'EcoMarine_Title'|localize}}:
          {{'Module_Title'|localize}}
        </span>
      </d-navbar-brand>
    </div>

    <d-collapse is-nav id="nav-collapse">
      <d-navbar-nav>
        <d-nav-item href="#" disabled>
          <div class="nav-link-icon__wrapper">
            <span class="black-text">{{date | date('datetime')}}</span>
          </div>
        </d-nav-item>
      </d-navbar-nav>

      <d-navbar-nav class="ml-auto">
        <div class="header">
          <d-nav class="header__nav">
            <ul class="header__navbar">
              <li class="header__item">
                <a href="#" class="header__link">
                  <transition name="slide-fade">
                    <!-- Header Navigation Menu Icons -->
                    <button class="header--button" v-if="show" key="on" @click="show = false">
                      <svg viewBox="0 0 24 24" class="header--icon">
                        <title>Close</title>
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                          fill="currentColor"
                          d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                        />
                      </svg>
                    </button>
                    <button class="header--button" v-else key="off" @click="show = true">
                      <svg viewBox="0 0 24 24" class="header--icon">
                        <title>Navigation Menu</title>
                        <path
                          fill="currentColor"
                          d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"
                        />
                      </svg>
                    </button>
                  </transition>
                </a>
                <!-- Dropdown Menu -->
                <transition name="dropdown">
                  <div class="dropdown__menu" v-bind:class="{ active: show }" v-if="show">
                    <ul class="dropdown__menu-nav">
                      <li class="dropdown__menu-item">
                        <a href="#" class="dropdown__menu-link" title="Account">
                          <div class="dropdown__menu-svg">
                            <svg viewBox="0 0 496 512">
                              <path
                                fill="currentColor"
                                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"
                              />
                            </svg>
                          </div>
                          <div class="dropdown__menu-text">{{name}}</div>
                        </a>
                      </li>
                      <li class="dropdown__menu-item">
                        <router-link
                          to="/profile"
                          class="dropdown__menu-link"
                          title="Personal info"
                        >
                          <div class="dropdown__menu-svg">
                            <svg viewBox="0 0 576 512">
                              <path
                                fill="currentColor"
                                d="M512 32H64C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm32 384c0 17.6-14.4 32-32 32H64c-17.6 0-32-14.4-32-32V96c0-17.6 14.4-32 32-32h448c17.6 0 32 14.4 32 32v320zm-72-128H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm0-64H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm0-64H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM208 288c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zm0-128c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zm46.8 144c-19.5 0-24.4 7-46.8 7s-27.3-7-46.8-7c-21.2 0-41.8 9.4-53.8 27.4C100.2 342.1 96 355 96 368.9V392c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-23.1c0-7 2.1-13.8 6-19.6 5.6-8.3 15.8-13.2 27.3-13.2 12.4 0 20.8 7 46.8 7 25.9 0 34.3-7 46.8-7 11.5 0 21.7 5 27.3 13.2 3.9 5.8 6 12.6 6 19.6V392c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-23.1c0-13.9-4.2-26.8-11.4-37.5-12.3-18-32.9-27.4-54-27.4z"
                              />
                            </svg>
                          </div>
                          <div class="dropdown__menu-text">{{'ProfileTitle'|localize}}</div>
                        </router-link>
                      </li>
                      <!-- Dropdown Menu Separator -->
                      <li class="dropdown__menu-item">
                        <a
                          href="#"
                          class="dropdown__menu-link"
                          title="Log out"
                          @click.prevent="logout"
                        >
                          <div class="dropdown__menu-svg">
                            <svg viewBox="0 0 512 512">
                              <path
                                fill="currentColor"
                                d="M256 169.92c-28.28.41-52.84 9.62-71.37 28.17-18 18-27.69 41.94-27.28 67.44.78 50.23-3.91 100.5-14 149.39-1.81 8.66 3.78 17.12 12.41 18.91 8.5 1.66 17.09-3.77 18.91-12.44 10.56-51.17 15.5-103.78 14.69-156.35-.25-16.77 6.09-32.5 17.91-44.31 18.66-18.66 42.27-18.8 48.75-18.8 37.12.55 66.41 30.19 66.97 66.06.78 50.37-2.97 100.86-11.12 150.06-1.44 8.72 4.44 16.95 13.16 18.39.91.16 1.78.22 2.66.22 7.69 0 14.47-5.55 15.75-13.39 8.47-51.08 12.34-103.48 11.56-155.79-.87-53-44.81-96.76-99-97.56zm-.09 86.09c-8.84.14-15.87 7.41-15.75 16.25 1.12 73.39-8.22 144.99-27.78 215.07l-1.22 4.33c-1.85 6.63 1.74 20.34 15.41 20.34 7 0 13.41-4.61 15.41-11.66l1.22-4.37c20.41-73.08 30.16-147.74 28.97-224.21-.14-8.84-8.23-15.9-16.26-15.75zM112.66 149.79c-25.19 30.98-38.72 70.11-38.09 110.15.62 39.56-2.62 79.14-9.59 117.61-1.56 8.7 4.19 17.03 12.91 18.61.97.17 1.91.25 2.87.25 7.56 0 14.31-5.42 15.72-13.14 7.34-40.53 10.72-82.18 10.09-123.82-.53-33.01 10.19-63.95 30.91-89.47 5.59-6.86 4.53-16.94-2.31-22.51-6.85-5.55-16.91-4.57-22.51 2.32zm399.22 103.03c-.25-16.5-2.19-33.03-5.75-49.14-1.91-8.61-10.34-14-19.06-12.17-8.62 1.91-14.09 10.44-12.19 19.08 3.09 14 4.78 28.39 5 42.73.12 7.66.16 15.31.09 22.97-.06 8.83 7.03 16.05 15.87 16.12h.12c8.78 0 15.94-7.08 16-15.87.07-7.91.04-15.81-.08-23.72zM252.6.05C182.63-1.29 118.32 24.88 70.32 72.91 24.04 119.22-.87 180.76.16 246.2c.12 7.55.06 15.09-.16 22.62-.25 8.83 6.72 16.2 15.56 16.45H16c8.62 0 15.75-6.87 16-15.55.22-8 .28-16.02.16-24.03-.9-56.69 20.69-110.04 60.78-150.16 41.78-41.84 98.9-64.37 159.15-63.48 74.69 1.09 144.87 38.23 187.75 99.32 5.12 7.23 15.12 8.97 22.28 3.91 7.25-5.08 9-15.05 3.91-22.28C417.28 43.52 337.5 1.3 252.6.05zm1.28 84.93a182.36 182.36 0 0 0-45.19 4.91c-8.59 2.03-13.91 10.66-11.87 19.26 2.03 8.58 10.75 13.87 19.25 11.86 12.12-2.86 25.09-4.25 37.31-4.03 82.78 1.22 151.12 67.56 152.37 147.89.62 39.65-1.34 79.59-5.81 118.7-1 8.78 5.31 16.7 14.09 17.7.62.08 1.22.11 1.84.11 8 0 14.94-6.02 15.87-14.19 4.62-40.47 6.62-81.79 6-122.82-1.49-97.44-83.99-177.92-183.86-179.39z"
                              />
                            </svg>
                          </div>
                          <div class="dropdown__menu-text">{{'Exit'|localize}}</div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </transition>
              </li>
            </ul>
          </d-nav>
        </div>
      </d-navbar-nav>
    </d-collapse>
  </d-navbar>
</template>


<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
    show: false
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })
  },
  beforeDestroy() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>

<style lang="scss">
// .header-navbar {
//   .item-icon-wrapper {
//     display: inline-block;
//   }
//   .dropdown-menu {
//     display: block;
//   }
// }

// :root {
//   // --font-primary: 'Open Sans', sans-serif;
//   --color-gray: #dadce0;
// }

// // Global

// *,
// ::after,
// ::before {
//   box-sizing: border-box;
// }

// // body {
// //   font-size: 1rem;
// //   -webkit-text-size-adjust: 100%;
// //   // font-family: var(--font-primary);
// //   overflow: hidden;
// // }
// // hr {
// //   border: 0;
// //   height: 0;
// //   margin: 1.5rem 0;
// //   border-top: 1px solid var(--color-gray);
// // }

// // Header Menu

// .header {
//   // padding: 2rem 5rem 2rem 5rem;
//   &__nav {
//     position: relative;
//   }
//   &__navbar {
//     display: flex;
//     align-items: center;
//     justify-content: flex-end;
//   }
//   &__item {
//     padding: 1rem;
//   }
//   &--icon {
//     width: 1.65rem;
//     height: 1.65rem;
//   }
//   &--button {
//     top: 0;
//     right: 0;
//     position: absolute;
//     margin: 0;
//     padding: 0;
//     color: gray;
//     cursor: pointer;
//     border: 1px solid transparent;
//     background-color: transparent;
//     &:focus {
//       outline: 0;
//     }
//   }
// }

// // Dropdown Menu

// .dropdown__menu {
//   top: 100%;
//   right: 0;
//   position: absolute;
//   z-index: 10;
//   // height: 25rem;
//   min-width: 300px;
//   // margin-top: 1rem;
//   // overflow-y: auto;
//   padding: 2rem 1rem 2rem 0rem;
//   // border-radius: 12px;
//   background-color: white;
//   border: 1px solid var(--color-gray);
//   background-clip: padding-box;
//   &-link {
//     display: flex;
//     // align-items: center;
//     justify-content: flex-start;
//     text-decoration: none;
//     color: rgba(0, 0, 0, 0.6);
//     // padding: 0.8rem 0 0.8rem 2rem;
//     // margin-top: 0.2rem;
//     // margin-bottom: 0.2rem;
//     // border-radius: 0 50px 50px 0;
//     &:hover {
//       color: #17bf63;
//       background-color: rgba(79, 192, 141, 0.1);
//     }
//   }
//   &-svg {
//     width: 1.5rem;
//     height: 1.5rem;
//   }
//   &-text {
//     font-weight: 300;
//     margin-left: 1rem;
//     margin-right: 1rem;
//   }
// }

// // Animation Menu Icon

// .slide-fade-enter-active,
// .slide-fade-leave-active {
//   transition: all 0.6s;
// }
// .slide-fade-enter,
// .slide-fade-leave-active {
//   opacity: 0;
// }
// .slide-fade-enter {
//   transform: translateX(31px);
// }
// .slide-fade-leave-active {
//   transform: translateX(-31px);
// }

// // Dropdown Menu Animation

// .dropdown-enter-active,
// .dropdown-leave-active {
//   transition: all 1s;
// }
// .dropdown-enter,
// .dropdown-leave-to {
//   opacity: 0;
//   transform: translateY(30px);
// }

// Wrapper

.main {
  // margin: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &__subtitle {
    color: #4f5959;
    font-weight: 100;
    margin-bottom: 2rem;
  }
  &__link {
    margin-right: 1.5rem;
    display: inline-block;
    &:last-child {
      margin-right: 0;
    }
  }
  &__svg {
    width: 2rem;
    height: 2rem;
    opacity: 0.6;
    color: #94a2b0;
    &:hover {
      color: #ffad1f;
    }
  }
}
:root {
  // --font-primary: 'Open Sans', sans-serif;
  --color-gray: #dadce0;
}

// Global

*,
::after,
::before {
  box-sizing: border-box;
}

// body {
//   font-size: 1rem;
//   -webkit-text-size-adjust: 100%;
//   // font-family: var(--font-primary);
//   overflow: hidden;
// }
// hr {
//   border: 0;
//   height: 0;
//   margin: 1.5rem 0;
//   border-top: 1px solid var(--color-gray);
// }

// Header Menu

.header {
  padding: 0.1rem 2rem 2rem 2rem;
  &__nav {
    position: relative;
    background-color: transparent;
  }
  &__navbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &__item {
    padding: 1rem;
  }
  &--icon {
    width: 1.35rem;
    height: 1.35rem;
  }
  &--button {
    top: 0;
    right: 0;
    position: absolute;
    margin: 0;
    padding: 0;
    color: black;
    cursor: pointer;
    border: 1px solid transparent;
    background-color: transparent;
    &:focus {
      outline: 0;
    }
  }
}

// Dropdown Menu

.dropdown__menu {
  top: 100%;
  right: 0;
  position: absolute;
  z-index: 10;
  height: 20rem;
  min-width: 230px;
  margin-top: 2rem;
  overflow-y: auto;
  padding: 1rem 1rem 8rem 0.5rem;
  // border-radius: 12px;
  background-color: white;
  border: 1px solid var(--color-gray);
  background-clip: padding-box;
  &-link {
    display: flex;
    align-items: right;
    justify-content: flex-start;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.6);
    padding: 0.8rem 0 0.8rem 2rem;
    // margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    // border-radius: 0 50px 50px 0;
    &:hover {
      // color: #17bf63;
      // background-color: rgba(79, 192, 141, 0.1);
    }
  }
  &-svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  &-text {
    font-weight: 300;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
}

// Animation Menu Icon

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s;
}
.slide-fade-enter,
.slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(31px);
}
.slide-fade-leave-active {
  transform: translateX(-31px);
}

Dropdown menu Animation .dropdown-enter-active,
.dropdown-leave-active {
  transition: all 1s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

// Wrapper

.main {
  margin: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &__subtitle {
    color: #4f5959;
    font-weight: 100;
    margin-bottom: 2rem;
  }
  &__link {
    margin-right: 1.5rem;
    display: inline-block;
    &:last-child {
      margin-right: 0;
    }
  }
  &__svg {
    // width: 2rem;
    // height: 2rem;
    opacity: 0.6;
    color: #94a2b0;
    &:hover {
      color: #ffad1f;
    }
  }
}
</style>
