var navMap = {
  'home':'','services':'ni-services','svc-storm':'ni-services',
  'svc-replace':'ni-services','svc-repair':'ni-services','svc-inspect':'ni-services',
  'svc-metal':'ni-services','svc-gutter':'ni-services','svc-skylight':'ni-services',
  'svc-exterior':'ni-services','svc-commercial':'ni-services',
  'insurance':'ni-insurance','areas':'ni-areas','about':'ni-about',
  'referrals':'ni-referrals','contact':''
};
function showPage(pageId) {
  var pages = document.querySelectorAll('.page');
  for (var i = 0; i < pages.length; i++) pages[i].style.display = 'none';
  var target = document.getElementById('page-' + pageId);
  if (target) { target.style.display = 'block'; window.scrollTo(0,0); }
  var navItems = document.querySelectorAll('.nav-item');
  for (var j = 0; j < navItems.length; j++) navItems[j].classList.remove('active');
  var activeNav = navMap[pageId];
  if (activeNav) { var el = document.getElementById(activeNav); if (el) el.classList.add('active'); }
}
showPage('home');

document.addEventListener('click', function(e) {
  if (!e.target.closest('.nav-item')) {
    var items = document.querySelectorAll('.nav-item');
    for (var i = 0; i < items.length; i++) items[i].classList.remove('open');
  }
});
var btns = document.querySelectorAll('.nav-item > button');
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function(e) {
    e.stopPropagation();
    var parent = this.closest('.nav-item');
    var wasOpen = parent.classList.contains('open');
    var items = document.querySelectorAll('.nav-item');
    for (var j = 0; j < items.length; j++) items[j].classList.remove('open');
    if (!wasOpen) parent.classList.add('open');
  });
}

function submitContactForm() {
  var fname = document.getElementById('cf-fname').value.trim();
  var lname = document.getElementById('cf-lname').value.trim();
  var phone = document.getElementById('cf-phone').value.trim();
  var email = document.getElementById('cf-email').value.trim();
  var address = document.getElementById('cf-address').value.trim();
  var service = document.getElementById('cf-service').value;
  var urgency = document.getElementById('cf-urgency').value;
  var contact = document.getElementById('cf-contact').value;
  var referral = document.getElementById('cf-referral').value;
  var success = document.getElementById('form-success');
  var error = document.getElementById('form-error');
  if (!fname || !phone || !email) { alert('Please fill in your first name, phone number, and email.'); return; }
  var btn = document.querySelector('.contact-form .btn-red');
  btn.textContent = 'Sending...'; btn.disabled = true;
  success.style.display = 'none'; error.style.display = 'none';
  fetch('https://nailedit-forms-ce89.jhotary.workers.dev', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({first_name:fname, last_name:lname, phone:phone, email:email, address:address, service:service, urgency:urgency, preferred_contact:contact, referral:referral})
  }).then(function(response) {
    if (response.ok) {
      success.style.display = 'block';
      ['cf-fname','cf-lname','cf-phone','cf-email','cf-address','cf-service','cf-urgency','cf-contact','cf-referral'].forEach(function(id){ document.getElementById(id).value=''; });
    } else {
      error.style.display = 'block';
    }
    btn.textContent = 'Send Message →'; btn.disabled = false;
  }).catch(function() {
    error.style.display = 'block';
    btn.textContent = 'Send Message →'; btn.disabled = false;
  });
}

function toggleMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  if (!menu) return;
  menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
}

function mobileNav(page) {
  var menu = document.getElementById('mobile-menu');
  if (menu) menu.style.display = 'none';
  showPage(page);
  window.scrollTo(0, 0);
}
function selectPackage(pkg) {
  showPage('contact');
  var sel = document.getElementById('cf-service');
  if (sel) {
    var opt = document.createElement('option');
    opt.value = 'Inspection Package — ' + pkg;
    opt.text  = 'Inspection Package — ' + pkg;
    sel.appendChild(opt);
    sel.value = 'Inspection Package — ' + pkg;
  }
  window.scrollTo(0, 0);
}
