/* 
 * @Author:KiranRohankar
 * @Name:Markov Chain Clustering.
 * @TypesofGraphs:directed/undirected
 *@Algorithm : http://www.cs.ucsb.edu/~xyan/classes/CS595D-2009winter/MCL_Presentation2.pdf
 */







(function(g5) {
    var f = g5.newField(); 
    g5.addAlgoPlugin({ name: "MCL clustering Algorithm", 
    algo: function(g) {
 
            for(var k in g.connectedComponentsNodes){   
                var myEdges = g.connectedComponentsEdges[k]; 
                var myNodes = g.connectedComponentsNodes[k]; 
                    var n=myNodes.length;
        var table= new Array(n);
    var input= new Array(n);
    for(var i=0;i<n;i++)
   input[i]= new Int32Array(n);

for(var i=0;i<n;i++)
{
    for(var j=0;j<n;j++)
    {
        if(i===j)
        {
                input[i][j]=1;
        }
        else
         input[i][j]=0;
    }
}

//create a dictionary for nodes so that I can get id associated with each node
for(var i=0;i<n;i++)
{
    table[myNodes[i].data.id]=i;
    
}
//create the adjecancy matrix for the graph
for(var i=0;i<myEdges.length;i++)
{
    input[table[myEdges[i].source.data.id]][table[myEdges[i].target.data.id]]=1;
    input[table[myEdges[i].target.data.id]][table[myEdges[i].source.data.id]]=1;
}
         var tab= mcl(input,n);
          var ct=0;
          for (var key in myNodes)  
          { 
          
          myNodes[key].data[f] = tab[ct];
          ct=ct+1;
	 }
 }//end of component for loop
          
         
         
        function mcl(a,n)
    {
            
   
        
         var count=0;
        while(count<8)
        {
            count++;
			a= powerOfTwo(a,n);
         }
        return  makeClusters(a,n);
        
  }




/*
     * @param {Float32Array} a
     * @param {int} n
     * @returns {Float32Array} 
     * @functionDescription : Raise the power of the given matrix by two.
     * perform the infaltion step which will rearrage the matrix according to its cluster properties.
     */
  
   function makeClusters(a,n)
    {
        var result=[];
            result[result.length]=(a[0][0]).toFixed(2);
      
        for(var i=1;i<n;i++)
        {
                var flag=false;  
            for(var j=0;j<result.length;j++)
            {
                if(result[j]===(a[i][0]).toFixed(2))
                {
                    flag=true;
                    break;
                }
            }
            if(flag===false)
            {
            result[result.length]=(a[i][0]).toFixed(2);
            }
        }
        
          var table= new Int32Array(n);
        
        for(var i=0;i<n;i++)
        {    
        for(var j=0;j<result.length;j++)
        {
            if((a[i][0]).toFixed(2)===result[j])
            {
                 table[i]=j+1;
                
                break;
            }
        }
        }   
        
        return table;
            
    }

//**********************End of Make Cluster*******************
   

  /*
     * 
     * @param {Float32Array} a
     * @param {int} n
     * @returns {Float32Array}
     * @functionDescription : Raise the power of the given matrix by two.
     * perform the infaltion step which will rearrage the matrix according to its cluster properties.
     */
    
     function powerOfTwo(a,n)
    {
        
        var c1= new Array(n);
        for(var i=0;i<n;i++)
        {
             c1[i]= new Float32Array(n);
            
        }
      
              var c= multiplyMatrix(a,a);
              

         //inflation step
        var sum=new  Float32Array(n);
          
          for(var i=0;i<n;i++)
          {
              var rowsum=0;
              for(var j=0;j<n;j++)
              {
               rowsum=rowsum+c[j][i];   
              }
              sum[i]=rowsum;
          }
         
          
        for(var i=0;i<n;i++)
        {
            for(var j=0;j<n;j++)
            {
                var d=c[i][j]/sum[j];
                
                c1[i][j]=d;
                
            }
        }
          
      a=c1;
    
       return c1;
    
         
       
    }

//**********************End of PowerofTwo*******************




   /*
     * @param {Float32Array} m1
     * @param {Float32Array} m2
     * @returns {Float32Array}
     * @functionDescription :Multiply given two matrices.
     */
    
     function multiplyMatrix(m1, m2) {
    var result = [];
    for(var j = 0; j < m2.length; j++) {
        result[j] = [];
        for(var k = 0; k < m1[0].length; k++) {
            var sum = 0;
            for(var i = 0; i < m1.length; i++) {
                sum += m1[i][k] * m2[j][i];
            }
            result[j].push(sum);
        }
    }
    return result;
}

//**********************End MultiplyMatrix*******************
           
    },  nodeAccs: {
                "MCL clustering": { type:"number", fct: g5.createAccessor(f)}
            },visible:true});

       
         
}(g5));
