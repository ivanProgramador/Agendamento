/*
Trata-se de um sistema de agendamento de consultas que usa o mongo db como base de dados 


Dados

  No formualrio de agendamento tem o campo cpf como se trata de um campo essecincial para a identificação 
  de um paciente eu não posso deixar que ele digite qualquer coisa por isso eu tenhio que adicinar uma mascara
  nesse campo.
  
  O plugin usado apra fazer isso vai ser o jQuery Mask Plugin o link para baixar é https://igorescobar.github.io/jQuery-Mask-Plugin/
  no caso eu so preciso do arquivo jquery.mask.mim é ele que vou colocar dentro da pasta public
 
  depois de fazer isso eu importo ele para a minha view e depois eu crio uma tag para apontar apara o campo 

  <script src="jquery.mask.min.js"></script>
  <script>
     $('.cpf').mask('000.000.000-00', {reverse: true});
  </script>

  mostrando dados no calendar 

  O calendar precisa que os dados estejam em um array para que possam ser exibidos como a Build()
  ja coloca esses ddaddos assim então basta passar a riota que retorna eles o parametro events 
  equivale a uma requisição get quando os dados vem pela rota ele origaniza na view
  
  
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js'></script>
<script>

    var element = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(element,{
        initialView:'dayGridMonth',
        locale:'pt-br',
        events:'getcalendar'
    });

    calendar.render();

  

</script>
  

*/