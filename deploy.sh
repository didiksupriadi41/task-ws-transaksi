chmod 400 $AWS_VM_PEM
ssh -o "StrictHostKeyChecking=no" -i $AWS_VM_PEM $AWS_VM_user@$AWS_VM_ip "rm -rf ws-transaksi"
ssh -o "StrictHostKeyChecking=no" -i $AWS_VM_PEM $AWS_VM_user@$AWS_VM_ip "mkdir ws-transaksi"
scp -o "StrictHostKeyChecking=no" -i $AWS_VM_PEM * $AWS_VM_user@$AWS_VM_ip:~/ws-transaksi
ssh -o "StrictHostKeyChecking=no" -i $AWS_VM_PEM $AWS_VM_user@$AWS_VM_ip "bash" < ./run.sh
