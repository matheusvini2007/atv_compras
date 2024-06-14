import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { ScrollView } from 'react-native';
import { supabase } from './conexao';

export default function App() {
  const [ProdutoDigitado, setProdutoDigitado] = useState("");
  const [valorDigitado, setvalorDigitado] = useState("");
  const [qtdProduto, setqtdProduto] = useState("");
  const [dados, setDados] = useState([]);
  //função de deletar dados no Banco de Dados
  const deletarContas = async(id) =>{
    const {error} = await supabase.from('tb_lista_compras')
    .delete().match({id})

    if(error){
      alert('Falha ao deletar produto!')
    }else{
      alert('Produto deletado com sucesso!')
      consultarProdutos()
    }
  }

  //função para consultar os dados no banco de dados
  const consultarProdutos = async()=>{
    const {data, error} = await supabase.from('tb_lista_compras')
    .select('*');
    if(error){
      alert('falha ao consultar dados!')
    }else{
      setDados(data);
    }
  }

  //criar uma função para inserir no banco de dados
  const cadastrarProduto = async(produto, vl, qtd)=>{
      if(produto == '' || vl == '' || qtd == ''){
        alert('preencha todos os campos!')
      }else{
        const {error} = await supabase.from('tb_lista_compras')
        .insert({coluna_produto: produto, coluna_valor: vl, coluna_quantidade: qtd});

        if(error){
          alert('Falha ao cadastrar o produto!')
        }else{+
          alert('Produto cadastrado com sucesso!')
        }
      }
    

  }
  // Chamar a função consultarProdutos quando o app for aberto
  useEffect(()=>{
    consultarProdutos();
}, [])
  
  
  return (
    <View style={styles.container}>

      <Text style={{fontSize: 35}}>Lista de compras</Text>
      <TextInput
        style={styles.caixaDeTexto}
        placeholder='Produto aqui' 
        onChangeText={(texto) => setProdutoDigitado(texto)}
      
      />
      <TextInput
        style={styles.caixaDeTexto}
        placeholder='Valor aqui'  
        onChangeText={(texto) => setvalorDigitado(texto)}
      />

      <TextInput
        style={styles.caixaDeTexto}
        placeholder='quantidade aqui'  
        onChangeText={(texto) => setqtdProduto(texto)}
      />

      <Button
        title='Cadastrar'
        onPress={() => {cadastrarProduto(ProdutoDigitado, valorDigitado, qtdProduto)}}
      />
      <ScrollView style={{width: '100%'}}> 
        {/*mapear os dados e dividir os itens */}

        {dados.map((item)=>(
          <View style={styles.caixaContas}>
            <Text>Nº: {item.id}</Text>
            <Text>Produto: {item.coluna_produto}</Text>
            <Text> R${item.coluna_valor}</Text>
            <Text>quantidade: {item.coluna_quantidade}</Text>
            <Button
              title='Excluir'
              onPress={()=>{deletarContas(item.id)}}

            />
          </View> 
        ))}

      </ScrollView>
      

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50
  },

  caixaDeTexto:{
    borderWidth: 1,
    width: '90%',
    padding: 10,
    margin: 15,
    borderRadius: 5
  },

  caixaContas:{
    width: '90%',
    minHeight: 70,
    borderWidth: 1,
    borderBlockColor: '2b2b2b',
    borderRadius: 8,
    margin: 30,
    padding: 10
  }
});
