currentDate = new Date();

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover({
    placement: 'bottom',
    html: true,
    content: function () {
      const $popoverContainer = $('<div class="popover-container"></div>');
      const $header = $('<div class="header"></div>');

      const previousButton = '<div class="link" onclick="changeMonth(\'previous\')"><svg x="0px" y="0px" width="15px" height="10px" viewBox="0 0 86.001 86.001" style="enable-background:new 0 0 86.001 86.001;" xml:space="preserve"><g><path d="M64.998,80.095c1.338,1.352,1.338,3.541,0,4.893c-1.336,1.35-3.506,1.352-4.844,0l-39.151-39.54c-1.338-1.352-1.338-3.543,0-4.895l39.15-39.539c1.338-1.352,3.506-1.352,4.844,0C66.335,2.366,66.335,4.556,65,5.907L29.294,43.001L64.998,80.095z"/></g></svg></div>';
      const nextButton = '<div class="link" onclick="changeMonth(\'next\')"><svg x="0px" y="0px" width="15px" height="10px" viewBox="0 0 86.001 86.001" style="enable-background:new 0 0 86.001 86.001;" xml:space="preserve"><g><path d="M21.003,80.094c-1.338,1.352-1.338,3.541,0,4.893c1.337,1.35,3.506,1.352,4.845,0l39.149-39.539c1.338-1.352,1.338-3.543,0-4.895L25.848,1.014c-1.339-1.352-3.506-1.352-4.845,0c-1.338,1.352-1.338,3.541-0.001,4.893L56.706,43L21.003,80.094z"/></g></svg></div>';
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

      const month = months[currentDate.getMonth()];
      const year = currentDate.getFullYear();

      $header.append(previousButton + `<span class="month-year">${month}, ${year}</span>` + nextButton);

      const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
      const weeksNumber = (parseInt(daysInMonth / 7) < daysInMonth / 7)
        ? Math.floor(daysInMonth / 7) + 1
        : Math.floor(daysInMonth / 7);

      const firstWeekDay = new Date(year, currentDate.getMonth(), 0).getDay() + 1;

      let weeks = '';

      for (let i = 0; i < weeksNumber; i++) {
        let week = '<tr class="week">';

        if (i === 0) {
          for (let j = 1; j <= 7; j++) {
            if (j < firstWeekDay) {
              week += '<td></td>';
            } else {
              week += `<td class="filled">${j - firstWeekDay + 1}</td>`;
            }
          }
        } else if (i === weeksNumber - 1) {
          for (let j = 1; j <= 7; j++) {
            if (i * 7 + j <= daysInMonth) {
              week += `<td class="filled">${i * 7 + j - firstWeekDay + 1}</td>`;
            } else {
              week += '<td></td>';
            }
          }
        } else {
          for (let j = 1; j <= 7; j++) {
            week += `<td class="filled">${i * 7 + j - firstWeekDay + 1}</td>`;
          }
        }

        week += '</tr>';

        weeks += week;
      }

      const $content = $(
        '<table>' +
        '<thead>' +
        '<tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr>' +
        '</thead>' +
        '<tbody class="calendar-container">' + weeks + '</tbody>' +
        '</table>'
      );

      const $footer = $('<div class="footer"></div>');

      $popoverContainer.append($header).append($content).append('<hr>').append($footer);

      return $popoverContainer;
    }
  })
});
