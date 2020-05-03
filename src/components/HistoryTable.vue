<template>
  <div>
    <div class="d-flex mb-2">
      <!-- <d-button outline size="sm" @click.prevent="export2Doc('text');">
        Сохранить как .doc
      </d-button> -->
    </div>
    <div id="exportContent" class="WordSection1">
      <table class="meta-table" ref="table" id="loremTable" summary="lorem ipsum sit amet" rules="groups" frame="hsides"
        border="2">
        <thead>
          <tr>
            <th>#</th>
            <th>{{'Amount'|localize}}</th>
            <th>{{'Date'|localize}}</th>
            <th>{{'Removal_Date'|localize}}</th>
            <th>{{'Category'|localize}}</th>
            <th>{{'Title_Site'|localize}}</th>
            <th>{{'Title_Transporter'|localize}}</th>
            <th>{{'Title_Utilizator'|localize}}</th>
            <th>{{'Type'|localize}}</th>
            <th style="display:none">{{'Open'|localize}}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(record, idx) of records" :key="record.id">
            <td>{{ idx + 1 }}</td>
            <td data-label="Объем">{{ record.amount }}</td>
            <td data-label="Дата">{{ record.date | date('datetime') }}</td>
            <td data-label="Дата вывоза">{{ record.removalDate | date('date') }}</td>
            <td data-label="Название">{{ record.categoryName }}</td>
            <td data-label="Место вывоза">{{ record.siteName }}</td>
            <td data-label="Название перевозчика">{{ record.transpoterName }}</td>
            <td data-label="Название места утилизации">{{ record.utilizatorName.title }}</td>
            <td style="display:none">
              <span :class="[record.typeClass]" class="white-text badge">{{ record.typeText }}</span>
            </td>
            <td>
              <button v-tooltip="'OpenRecord'" class="btn-sm btn-info" @click="$router.push('/detail/' + record.id)">
                <i class="material-icons">open_in_new</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    },
  },
  // methods: {
  //   // HTML to Microsoft Word Export
  //   // This code demonstrates how to export an html element to Microsoft Word
  //   // with CSS styles to set page orientation and paper size.
  //   // Tested with Word 2010, 2013 and FireFox, Chrome, Opera, IE10-11
  //   // Fails in legacy browsers (IE<10) that lack window.Blob object

  //   export2Doc(text, filename) {

  //     if (!window.Blob) {
  //       alert('Your legacy browser does not support this action.');
  //       return;
  //     }

  //     var html, link, blob, url, css;

  //     // EU A4 use: size: 841.95pt 595.35pt;
  //     // US Letter use: size:11.0in 8.5in;

  //     css = ('\
  //  <style>\
  //  @page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}\
  //  div.WordSection1 {page: WordSection1;}\
  //  h1 {font-family: "Arial", Georgia, Serif; font-size: 12pt;}\
  //  p {font-family: "Arial", Georgia, Serif; font-size: 10pt;}\
  //  table{border-collapse:collapse;}td{border:1px gray solid;width:5em;padding:2px;}\
  //  </style>\
  // ');

  //     var rightAligned = document.getElementsByClassName("sm-align-right");
  //     for (var i = 0, max = rightAligned.length; i < max; i++) {
  //       rightAligned[i].style = "text-align: right;"
  //     }

  //     var centerAligned = document.getElementsByClassName("sm-align-center");
  //     for (var i = 0, max = centerAligned.length; i < max; i++) {
  //       centerAligned[i].style = "text-align: center;"
  //     }

  //     html = document.getElementById('exportContent').innerHTML;
  //     html = '\
  // <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">\
  // <head>\
  //   <title>Document Title</title>\
  //   <xml>\
  //     <w:worddocument xmlns:w="#unknown">\
  //       <w:view>Print</w:view>\
  //       <w:zoom>90</w:zoom>\
  //       <w:donotoptimizeforbrowser />\
  //     </w:worddocument>\
  //   </xml>\
  // </head>\
  // <body lang=RU-ru style="tab-interval:.5in">\
  //   <div class="Section1">' + html + '</div>\
  // </body>\
  // </html>'

  //     blob = new Blob(['\ufeff', css + html], {
  //       type: 'application/msword'
  //     });

  //     url = URL.createObjectURL(blob);
  //     link = document.createElement('A');
  //     link.href = url;

  //     // filename = filename ? filename + '.doc' : 'document.doc';

  //     filename = 'filename';

  //     // Set default file name.
  //     // Word will append file extension - do not add an extension here.
  //     link.download = filename;

  //     document.body.appendChild(link);

  //     if (navigator.msSaveOrOpenBlob) {
  //       navigator.msSaveOrOpenBlob(blob, filename + '.doc'); // IE10-11
  //     } else {
  //       link.click(); // other browsers
  //     }

  //     document.body.removeChild(link);
  //   },
      
  // }
}
</script>
