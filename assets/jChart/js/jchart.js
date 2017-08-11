$(document).ready(function () {
            

            $('#jqChart').jqChart({
                 borderLineColor: 'Blue',
                title: { text: '前端技能 - 熟练程度' },
                axes: [
                        {
                            location: 'left',
                            minimum: 1,
                            maximum: 10,
                            interval: 1
                        }
                      ],
                series: [
                            {
                                type: 'column',
								title: '柱状图数据',
                                fillStyles: ['#fffc00', '#fffc00', '#fffc00', '#fffc00', '#fffc00'],
                                data: [['HTML', 7.5], ['CSS', 7], ['JavaScript', 5.5], ['jQuery', 5.0], ['Bootstrap', 6.5], ['Vue.js', 3.0]]
                            }
                        ]
               
            });


            // $('#jqChart').jqChart({}); 
            // // $('#jqChart').jqChart('refresh');


        });