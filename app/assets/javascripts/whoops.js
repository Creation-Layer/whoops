Whoops = {
  setupFilters: function() {
    function checkboxBehavior(afterChecked) {
      if (afterChecked === undefined) {
        afterChecked = function(){}
      }
      
      return function(i, list){
        var all = $($(list).find("input").get(0));
        var allowedValues = $(list).find("input").slice(1);
        var form = $(this).parents("form");
        
        all.change(function(event){
          if ($(this).attr("checked")) {
            allowedValues.attr("checked", false);
            afterChecked(form);
          } else {
            $(this).attr("checked", true);
          }
        })

        $(allowedValues).change(function(event){
          if ($(this).attr("checked")) {
            all.attr("checked", false);
          }
          afterChecked(form);
        })
      }
    }

    $("#new_whoops_filter ul").each(checkboxBehavior(function(form){form.submit()}));
    $("#new-notification-rule .filters ul").each(checkboxBehavior());
    
    $("#reset").click(function(){
      window.location = window.location.pathname
      return false
    })
  },
  
  setupEventLinks: function() {
    $("#instances a").click(function(){
      $(".selected").removeClass("selected")
      $(this).parents("li").addClass("selected")
      $.get(this.href,function(data){
        $("#event-details").html(data)
      }, 'html')
      return false;
    })
  },
  
  setupInfo: function() {
    $(".info-revealer").click(function() {
      $(".info").toggle(300)
    })
  },
  
  setup: function() {
    this.setupFilters();
    this.setupEventLinks();
    this.setupInfo();
  }
}

$(function(){
  Whoops.setup();
})

jQuery.ajaxSetup({ 
  beforeSend: function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
})
