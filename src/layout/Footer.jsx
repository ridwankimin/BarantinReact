import React from 'react'
import Content from './Content'

function Footer() {
  return (
    <div className="layout-page">
                <nav className="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme" id="layout-navbar">
                    <div className="container-fluid">
                        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                            <a className="nav-item nav-link px-0 me-xl-4" href="#">
                                <i className="bx bx-menu bx-sm"></i>
                            </a>
                        </div>

                        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                            <div className="navbar-nav align-items-center">
                                <div className="nav-item navbar-search-wrapper mb-0">
                                    <a className="nav-item nav-link search-toggler px-0" href="#">
                                        <i className="bx bx-search-alt bx-sm"></i>
                                        <span className="d-none d-md-inline-block text-muted">Search (Ctrl+/)</span>
                                    </a>
                                </div>
                            </div>

                            <ul className="navbar-nav flex-row align-items-center ms-auto">
                                <li className="nav-item me-2 me-xl-0">
                                    <a className="nav-link style-switcher-toggle hide-arrow" href="#">
                                        <i className="bx bx-sm"></i>
                                    </a>
                                </li>

                                <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
                                    <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                        <i className="bx bx-grid-alt bx-sm"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end py-0">
                                        <div className="dropdown-menu-header border-bottom">
                                            <div className="dropdown-header d-flex align-items-center py-3">
                                                <h5 className="text-body mb-0 me-auto">Shortcuts</h5>
                                                <a href="#" className="dropdown-shortcuts-add text-body" data-bs-toggle="tooltip" data-bs-placement="top" title="Add shortcuts"><i className="bx bx-sm bx-plus-circle"></i></a>
                                            </div>
                                        </div>
                                        <div className="dropdown-shortcuts-list scrollable-container">
                                            <div className="row row-bordered overflow-visible g-0">
                                                <div className="dropdown-shortcuts-item col">
                                                    <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                        <i className="bx bx-calendar fs-4"></i>
                                                    </span>
                                                    <a href="app-calendar.html" className="stretched-link">Calendar</a>
                                                    <small className="text-muted mb-0">Appointments</small>
                                                </div>
                                                <div className="dropdown-shortcuts-item col">
                                                    <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                        <i className="bx bx-food-menu fs-4"></i>
                                                    </span>
                                                    <a href="app-invoice-list.html" className="stretched-link">Invoice App</a>
                                                    <small className="text-muted mb-0">Manage Accounts</small>
                                                </div>
                                            </div>
                                            <div className="row row-bordered overflow-visible g-0">
                                                <div className="dropdown-shortcuts-item col">
                                                    <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                        <i className="bx bx-user fs-4"></i>
                                                    </span>
                                                    <a href="app-user-list.html" className="stretched-link">User App</a>
                                                    <small className="text-muted mb-0">Manage Users</small>
                                                </div>
                                                <div className="dropdown-shortcuts-item col">
                                                    <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                        <i className="bx bx-check-shield fs-4"></i>
                                                    </span>
                                                    <a href="app-access-roles.html" className="stretched-link">Role Management</a>
                                                    <small className="text-muted mb-0">Permission</small>
                                                </div>
                                            </div>
                                            <div className="row row-bordered overflow-visible g-0">
                                                <div className="dropdown-shortcuts-item col">
                                                    <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                        <i className="bx bx-pie-chart-alt-2 fs-4"></i>
                                                    </span>
                                                    <a href="index.html" className="stretched-link">Dashboard</a>
                                                    <small className="text-muted mb-0">User Profile</small>
                                                </div>
                                                <div className="dropdown-shortcuts-item col">
                                                    <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                        <i className="bx bx-cog fs-4"></i>
                                                    </span>
                                                    <a href="pages-account-settings-account.html" className="stretched-link">Setting</a>
                                                    <small className="text-muted mb-0">Account Settings</small>
                                                </div>
                                            </div>
                                            <div className="row row-bordered overflow-visible g-0">
                                                <div className="dropdown-shortcuts-item col">
                                                    <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                        <i className="bx bx-help-circle fs-4"></i>
                                                    </span>
                                                    <a href="pages-help-center-landing.html" className="stretched-link">Help Center</a>
                                                    <small className="text-muted mb-0">FAQs & Articles</small>
                                                </div>
                                                <div className="dropdown-shortcuts-item col">
                                                    <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                        <i className="bx bx-window-open fs-4"></i>
                                                    </span>
                                                    <a href="modal-examples.html" className="stretched-link">Modals</a>
                                                    <small className="text-muted mb-0">Useful Popups</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                                    <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
                                        <div className="avatar avatar-online">
                                            <img src="assets/img/avatars/1.png" className="rounded-circle" />
                                        </div>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <a className="dropdown-item" href="pages-account-settings-account.html">
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0 me-3">
                                                        <div className="avatar avatar-online">
                                                            <img src="assets/img/avatars/1.png" className="rounded-circle" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <span className="fw-semibold d-block lh-1">John Doe</span>
                                                        <small>Admin</small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="dropdown-divider"></div>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="pages-profile-user.html">
                                                <i className="bx bx-user me-2"></i>
                                                <span className="align-middle">My Profile</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="pages-account-settings-account.html">
                                                <i className="bx bx-cog me-2"></i>
                                                <span className="align-middle">Settings</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="pages-account-settings-billing.html">
                                                <span className="d-flex align-items-center align-middle">
                                                    <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                                                    <span className="flex-grow-1 align-middle">Billing</span>
                                                    <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="dropdown-divider"></div>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="pages-help-center-landing.html">
                                                <i className="bx bx-support me-2"></i>
                                                <span className="align-middle">Help</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="pages-faq.html">
                                                <i className="bx bx-help-circle me-2"></i>
                                                <span className="align-middle">FAQ</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="pages-pricing.html">
                                                <i className="bx bx-dollar me-2"></i>
                                                <span className="align-middle">Pricing</span>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="dropdown-divider"></div>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="auth-login-cover.html" target="_blank">
                                                <i className="bx bx-power-off me-2"></i>
                                                <span className="align-middle">Log Out</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div className="navbar-search-wrapper search-input-wrapper d-none">
                            <input type="text" className="form-control search-input container-fluid border-0" placeholder="Search..." aria-label="Search..." />
                            <i className="bx bx-x bx-sm search-toggler cursor-pointer"></i>
                        </div>
                    </div>
                </nav>

                <div className="content-wrapper">
                    <Content/>
                    {/* {link} */}

                    <footer className="content-footer footer bg-footer-theme">
                        <div className="container-fluid d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                            <div className="mb-2 mb-md-0">
                                ©
                                <script>
                                    {/* document.write(new Date().getFullYear()); */}
                                </script>
                            </div>
                        </div>
                    </footer>

                    <div className="content-backdrop fade"></div>
                </div>
    </div>
  )
}

export default Footer