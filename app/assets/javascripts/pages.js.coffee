# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.

$ ->
  $('.panel-body .page-title a').click (e)->
    e.preventDefault()
    $("#page-content").load $(this).attr('href')

  $('.page-new a').click (e)->
    e.preventDefault()
    $("#page-content").load $(this).attr('href')

  $('.menu').on 'click', ->
    $('.navbar-nav').toggleClass('open')

  $('[class^="four_oven"] .color-chip').on 'click', (e) ->
    lastClass = $(this).attr('class').split(' ').pop()
    imageName = lastClass.split('-').pop()
    folder = $(this).parent().attr('class').split(' ')[0]

    console.log folder

    $('.image-container img').attr('src', '/assets/' + folder + '/4oven_cont_' + imageName + '.jpg')