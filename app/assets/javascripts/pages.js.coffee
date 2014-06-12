# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.

$ ->
  $('.panel-body .page-title a').click (e)->
    e.preventDefault()
    $("#page-content").load $(this).attr('href')

  $('.page-new a').click (e)->
    e.preventDefault()
    $("#page-content").load $(this).attr('href')