function ToggleRemoveClass(el,rmClassName){
  this.el = el;
  this.rmClassName = rmClassName;
  this.els = document.querySelectorAll(this.el);
}
ToggleRemoveClass.prototype.initiate = function(){
  this.els.forEach(
    c=>
      c.onclick = e=>
        this.els.forEach(
          d=>
            d.classList[c==d?"toggle":"remove"](this.rmClassName),
            e.stopPropagation()
        )
  );
};


function removeClass(el,rmClassName){
  document.querySelectorAll(el).forEach(function(elm){
    elm.classList.remove(rmClassName);
  });
}

document.onclick = function(){
  removeClass('.aurora-flyout-trigger','is-active');
};

window.addEventListener("load", function(){
  let rm1 = new ToggleRemoveClass(".resource-list-item-action .trigger","is-active");
  let rm2 = new ToggleRemoveClass(".aurora-flyout-trigger","is-active");
  rm1.initiate();
  rm2.initiate();
});
